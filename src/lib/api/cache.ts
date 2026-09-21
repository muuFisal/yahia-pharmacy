// ─────────────────────────────────────────────────────────────────
// Standardized Resource Names
// ─────────────────────────────────────────────────────────────────
export const CACHE_RESOURCES = {
  SETTINGS: 'storefront-settings',
  BANNERS: 'banners',
  CATEGORIES: 'categories',
  CMS: 'cms-page',
  PRODUCTS: 'products',
  PRODUCT_DETAILS: 'product-details',
} as const;

export type CacheResource = typeof CACHE_RESOURCES[keyof typeof CACHE_RESOURCES] | string;

export interface CacheEntry<T = unknown> {
  data: T;
  createdAt: number;
  ttlMs: number;
  lastAccessed: number;
  resource: string;
}

export interface GetOrFetchOptions<T> {
  resource: CacheResource;
  fetcher: (signal?: AbortSignal) => Promise<T>;
  ttlMs?: number;
  params?: Record<string, unknown> | unknown[];
  lang?: string;
  signal?: AbortSignal;
  deduplicateOnly?: boolean;
}

// Collision-resistant 64-bit FNV-1a hash generator for parameter normalization
function hashStringSync(str: string): string {
  let h1 = 0x811c9dc5;
  let h2 = 0x050c5f1d;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 0x01000193);
    h2 = Math.imul(h2 ^ ch, 0x01000193);
  }
  return (h1 >>> 0).toString(16).padStart(8, '0') + (h2 >>> 0).toString(16).padStart(8, '0');
}

// Stable recursive parameter normalization
export function normalizeParams(params: unknown): string {
  if (params === null) return 'null';
  if (params === undefined) return 'undefined';
  if (typeof params !== 'object') return String(params);
  if (Array.isArray(params)) {
    return '[' + params.map(normalizeParams).join(',') + ']';
  }
  const keys = Object.keys(params as Record<string, unknown>).sort();
  const pairs = keys.map(key => `${key}:${normalizeParams((params as Record<string, unknown>)[key])}`);
  return '{' + pairs.join(',') + '}';
}

class ApiCache {
  private cache = new Map<string, CacheEntry<unknown>>();
  private pendingRequests = new Map<string, Promise<unknown>>();
  private internalControllers = new Map<string, AbortController>();

  private maxEntries = 100;
  private maxPending = 50;
  private cacheGeneration = 0;

  /**
   * Constructs standardized cache key:
   * v1|lang:<language>|scope:public|resource:<resource>|params:<normalizedHash>
   */
  public buildCacheKey(
    resource: string,
    params?: unknown,
    lang?: string,
  ): string {
    const currentLang = lang || (typeof localStorage !== 'undefined' ? localStorage.getItem('language') : null) || 'ar';
    const normParams = normalizeParams(params);
    const paramsHash = normParams ? hashStringSync(normParams) : 'none';

    return `v1|lang:${currentLang}|scope:public|resource:${resource}|params:${paramsHash}`;
  }

  /**
   * Lazy expired-entry cleanup
   */
  private cleanupExpired(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.createdAt >= entry.ttlMs) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Enforce capacity limits via LRU eviction
   */
  private enforceCapacity(): void {
    if (this.cache.size <= this.maxEntries) return;

    let oldestKey: string | null = null;
    let oldestAccess = Infinity;

    for (const [key, entry] of this.cache.entries()) {
      if (entry.lastAccessed < oldestAccess) {
        oldestAccess = entry.lastAccessed;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey);
    }
  }

  /**
   * Core Cache & Deduplication API
   */
  public async getOrFetch<T>(options: GetOrFetchOptions<T>): Promise<T> {
    const { resource, fetcher, ttlMs = 0, params, lang, signal, deduplicateOnly = false } = options;
    const cacheKey = this.buildCacheKey(resource, params, lang);

    this.cleanupExpired();

    // 1️⃣ Check TTL Cache Memory (unless deduplicateOnly)
    if (!deduplicateOnly && ttlMs > 0) {
      const existing = this.cache.get(cacheKey);
      if (existing) {
        const isFresh = Date.now() - existing.createdAt < existing.ttlMs;
        if (isFresh) {
          existing.lastAccessed = Date.now(); // LRU update
          return existing.data as T;
        } else {
          this.cache.delete(cacheKey);
        }
      }
    }

    // 2️⃣ In-Flight Deduplication Check
    if (this.pendingRequests.has(cacheKey)) {
      const sharedPromise = this.pendingRequests.get(cacheKey) as Promise<T>;
      if (!signal) {
        return sharedPromise;
      }

      // Consumer cancellation isolation: race consumer signal against shared promise locally
      return new Promise<T>((resolve, reject) => {
        const onAbort = () => {
          signal.removeEventListener('abort', onAbort);
          reject(new Error('CanceledError'));
        };

        if (signal.aborted) {
          return reject(new Error('CanceledError'));
        }

        signal.addEventListener('abort', onAbort);

        sharedPromise
          .then((res) => {
            signal.removeEventListener('abort', onAbort);
            resolve(res);
          })
          .catch((err) => {
            signal.removeEventListener('abort', onAbort);
            reject(err);
          });
      });
    }

    // 3️⃣ Check Max Pending Limits
    if (this.pendingRequests.size >= this.maxPending) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`[ApiCache] Pending request limit (${this.maxPending}) reached. Executing un-deduplicated request.`);
      }
      return fetcher(signal);
    }

    // 4️⃣ Execute Shared Fetcher with internal AbortController
    const startGeneration = this.cacheGeneration;
    const internalController = new AbortController();
    this.internalControllers.set(cacheKey, internalController);

    const fetchPromise: Promise<T> = (async () => {
      try {
        const result = await fetcher(internalController.signal);

        // Version Guard: Ensure clear() did not occur during fetch
        const isSameGen = this.cacheGeneration === startGeneration;
        const isCurrentPending = this.internalControllers.get(cacheKey) === internalController;

        if (!isSameGen || !isCurrentPending) {
          throw new Error('CanceledError: Request invalidated because cache generation changed');
        }

        if (!deduplicateOnly && ttlMs > 0) {
          this.cache.set(cacheKey, {
            data: result,
            createdAt: Date.now(),
            ttlMs,
            lastAccessed: Date.now(),
            resource,
          });
          this.enforceCapacity();
        }
        return result;
      } finally {
        if (this.internalControllers.get(cacheKey) === internalController) {
          this.pendingRequests.delete(cacheKey);
          this.internalControllers.delete(cacheKey);
        }
      }
    })();

    this.pendingRequests.set(cacheKey, fetchPromise);

    // Attach consumer signal wrapper if provided
    if (!signal) {
      return fetchPromise;
    }

    return new Promise<T>((resolve, reject) => {
      const onAbort = () => {
        signal.removeEventListener('abort', onAbort);
        reject(new Error('CanceledError'));
      };

      if (signal.aborted) {
        return reject(new Error('CanceledError'));
      }

      signal.addEventListener('abort', onAbort);

      fetchPromise
        .then((res) => {
          signal.removeEventListener('abort', onAbort);
          resolve(res);
        })
        .catch((err) => {
          signal.removeEventListener('abort', onAbort);
          reject(err);
        });
    });
  }

  // ─────────────────────────────────────────────────────────────────
  // Invalidation APIs
  // ─────────────────────────────────────────────────────────────────

  public invalidateExact(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Invalidate resource
   */
  public invalidateResource(resource: string): void {
    for (const [key, entry] of this.cache.entries()) {
      if (entry.resource === resource) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Invalidate resource prefix
   */
  public invalidateResourcePrefix(prefix: string): void {
    for (const [key, entry] of this.cache.entries()) {
      if (entry.resource.startsWith(prefix)) {
        this.cache.delete(key);
      }
    }
  }

  public clear(): void {
    this.cacheGeneration++;
    this.cache.clear();

    // Abort internal controllers on clear
    for (const controller of this.internalControllers.values()) {
      controller.abort();
    }
    this.internalControllers.clear();
    this.pendingRequests.clear();
  }

  // Debug & Test Inspection Helpers
  public getCacheSize(): number {
    return this.cache.size;
  }

  public getPendingSize(): number {
    return this.pendingRequests.size;
  }
}

export const apiCache = new ApiCache();
