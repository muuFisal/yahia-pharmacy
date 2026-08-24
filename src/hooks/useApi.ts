import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Generic data-fetching hook.
 *
 * Handles loading, error, and data states so components stay clean.
 * Automatically cancels stale requests when dependencies change.
 *
 * @example
 * ```tsx
 * const { data: products, loading, error, refetch } = useApi(
 *   () => ProductsService.getProducts({ type: 'course' }),
 *   [selectedType]
 * );
 * ```
 */
export function useApi<T>(
  fetcher: () => Promise<T>,
  deps: unknown[] = [],
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);
  const [version, setVersion] = useState(0);
  const [prevDeps, setPrevDeps] = useState<unknown[]>(deps);

  // Compare dependencies to trigger execution on change without using refs during render
  const depsChanged =
    deps.length !== prevDeps.length ||
    deps.some((dep, i) => dep !== prevDeps[i]);

  if (depsChanged) {
    setPrevDeps(deps);
    setVersion((v) => v + 1);
  }

  const fetcherRef = useRef(fetcher);
  useEffect(() => {
    fetcherRef.current = fetcher;
  }, [fetcher]);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetcherRef.current();
      if (mountedRef.current) {
        setData(result);
      }
    } catch (err: unknown) {
      if (mountedRef.current) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred');
        }
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    execute();
    return () => {
      mountedRef.current = false;
    };
  }, [execute, version]);

  const refetch = useCallback(() => {
    execute();
  }, [execute]);

  return { data, loading, error, refetch };
}

/**
 * Hook for mutation operations (POST, PUT, DELETE).
 *
 * Unlike useApi, this does NOT auto-execute on mount.
 * You call `mutate()` explicitly when the user performs an action.
 *
 * @example
 * ```tsx
 * const { mutate: createOrder, loading } = useMutation(
 *   (data: CreateOrderDTO) => OrdersService.create(data)
 * );
 *
 * const handleSubmit = async () => {
 *   const order = await createOrder(orderData);
 *   // handle success
 * };
 * ```
 */
export function useMutation<TData, TVariables = void>(
  mutationFn: (variables: TVariables) => Promise<TData>,
) {
  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(
    async (variables: TVariables): Promise<TData> => {
      setLoading(true);
      setError(null);

      try {
        const result = await mutationFn(variables);
        setData(result);
        return result;
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : 'An unexpected error occurred';
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [mutationFn],
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, mutate, reset };
}
