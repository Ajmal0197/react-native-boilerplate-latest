import { useState, useEffect } from 'react';

/**
 * Debounces a value with configurable delay
 *
 * Useful for search inputs to prevent excessive API requests or list filtering.
 */
export const useDebounce = <T>(value: T, delayMs = 300): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delayMs]);

  return debouncedValue;
};
