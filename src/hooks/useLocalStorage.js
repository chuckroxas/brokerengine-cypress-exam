import { useCallback, useMemo } from 'react';

export default function useLocalStorage(key, onError) {
  const get = useCallback(() => localStorage.getItem(key), [key]);
  const set = useCallback(
    (value) => {
      try {
        localStorage.setItem(key, value);
      } catch (error) {
        if (typeof onError === 'function') {
          onError(error);
        }
      }
    },
    [onError, key]
  );
  const remove = useCallback(() => localStorage.removeItem(key), [key]);
  const isSet = useCallback(() => get() !== null, [get]);

  return useMemo(
    () => ({ get, set, remove, isSet }),
    [get, set, remove, isSet]
  );
}
