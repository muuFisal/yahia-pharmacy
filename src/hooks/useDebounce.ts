import { useState, useEffect } from 'react';

/**
 * Custom hook for debouncing rapidly changing values (e.g. search inputs, filters).
 * @param value The value to debounce.
 * @param delay Delay in milliseconds (default: 350ms).
 */
export function useDebounce<T>(value: T, delay = 350): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
