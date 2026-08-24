import CryptoJS from 'crypto-js';

/**
 * AES-encrypted localStorage wrapper for sensitive data.
 *
 * Usage is identical to `localStorage` — just call `secureStorage.setItem(key, value)`
 * and `secureStorage.getItem(key)`.
 *
 * Values are serialised to JSON (if not already strings), encrypted with AES-256,
 * and stored as Base-64 cipher text.  On read they are transparently decrypted and
 * returned in their original form.
 *
 * NOTE: This provides **obfuscation**, not bulletproof security.  The encryption
 * key lives in the client bundle, so a determined attacker with dev-tools access
 * can still extract it.  For true token security, prefer HttpOnly cookies.
 */

const SECRET_KEY = import.meta.env.VITE_STORAGE_SECRET || 'bookhub-2026-aes-key';

export const secureStorage = {
  /**
   * Encrypt and persist a value under the given key.
   * Accepts strings, numbers, booleans, arrays, and plain objects.
   */
  setItem: (key: string, value: unknown): void => {
    const raw = typeof value === 'string' ? value : JSON.stringify(value);
    const encrypted = CryptoJS.AES.encrypt(raw, SECRET_KEY).toString();
    localStorage.setItem(key, encrypted);
  },

  /**
   * Read a value, returning `null` when the key does not exist or decryption
   * fails (e.g. the value was written before encryption was enabled).
   *
   * If the decrypted text is valid JSON it is automatically parsed; otherwise
   * the plain string is returned.
   */
  getItem: <T = unknown>(key: string): T | null => {
    const cipher = localStorage.getItem(key);
    if (!cipher) return null;

    try {
      const bytes = CryptoJS.AES.decrypt(cipher, SECRET_KEY);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);

      // AES.decrypt returns an empty string when the cipher is not valid
      if (!decrypted) return null;

      try {
        return JSON.parse(decrypted) as T;
      } catch {
        return decrypted as T;
      }
    } catch {
      // If decryption blows up (corrupted / legacy unencrypted value), wipe it
      console.warn(`[secureStorage] Failed to decrypt key "${key}" — removing stale entry.`);
      localStorage.removeItem(key);
      return null;
    }
  },

  /** Remove a key from localStorage. */
  removeItem: (key: string): void => {
    localStorage.removeItem(key);
  },
};
