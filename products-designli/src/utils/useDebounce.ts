import { useState, useEffect } from 'react';

// Debounce hook to delay a value update by a specified delay time
export const useDebounceInput = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler); // Clear timeout if value changes before delay
    };
  }, [value, delay]);

  return debouncedValue;
};