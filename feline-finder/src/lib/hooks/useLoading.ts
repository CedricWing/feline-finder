import { useState, useCallback } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useLoading = <T, R extends Array<any>>(
  fn: (...args: R) => Promise<T>,
  initialLoadingState = false,
): [boolean, (...args: R) => Promise<T>] => {
  const [loading, setLoading] = useState(initialLoadingState);
  const wrappedFunction = useCallback(
    (...args: R) => {
      const call = fn(...args);
      setLoading(true);
      return call
        .then((res) => {
          setLoading(false);
          return res;
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
          throw error;
        });
    },
    [fn],
  );
  return [loading, wrappedFunction];
};
