
import { useState, useEffect } from 'react';

/**
 * Custom hook for managing state in sessionStorage
 * @param key Storage key
 * @param initialValue Default value if key doesn't exist
 * @returns [storedValue, setValue] tuple
 */
function useSessionStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // Create state to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    // Check if window is available (for SSR)
    if (typeof window === 'undefined') {
      return initialValue;
    }
    
    try {
      // Get from sessionStorage by key
      const item = window.sessionStorage.getItem(key);
      // Parse stored JSON or return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading sessionStorage key "${key}":`, error);
      return initialValue;
    }
  });
  
  // Return a wrapped version of useState's setter function that
  // persists the new value to sessionStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to sessionStorage
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error writing sessionStorage key "${key}":`, error);
    }
  };
  
  // Listen for changes to this key in other tabs/windows
  useEffect(() => {
    function handleStorageChange(e: StorageEvent) {
      if (e.storageArea === sessionStorage && e.key === key) {
        try {
          setStoredValue(e.newValue ? JSON.parse(e.newValue) : initialValue);
        } catch (error) {
          console.error(`Error responding to sessionStorage change for key "${key}":`, error);
        }
      }
    }
    
    // Add event listener for changes
    window.addEventListener('storage', handleStorageChange);
    
    // Remove event listener on cleanup
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, initialValue]);
  
  return [storedValue, setValue];
}

export default useSessionStorage;
