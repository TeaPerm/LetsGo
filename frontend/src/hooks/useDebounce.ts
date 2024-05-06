import { useState, useEffect } from "react";

// Define a generic function called useDebounce
const useDebounce = <T>(value: T, delay = 500) => {
  // Create a state variable to hold the debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Create a timeout to update the debounced value after the specified delay
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up function to clear the timeout if the value changes before the delay
    return () => clearTimeout(timeoutId);
  }, [value, delay]); // Re-run effect if value or delay changes

  return debouncedValue; // Return the debounced value
};

export default useDebounce; // Export the useDebounce hook
