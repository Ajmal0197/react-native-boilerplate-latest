import { useEffect, useRef } from 'react';
import { AppConstant } from '@services/AppConstant';

/**
 * Custom hook to manage API call cancellation on component unmount.
 *
 * Automatically aborts any ongoing network requests tied to this signal
 * when the component leaves the screen.
 *
 * Usage:
 * ```tsx
 * const { signal } = useApiCancellation();
 *
 * useEffect(() => {
 *   homeApi.getPhotos({ page: 1 }, signal);
 * }, [signal]);
 * ```
 */
export const useApiCancellation = () => {
  const controllerRef = useRef<AbortController | null>(null);

  if (!controllerRef.current) {
    controllerRef.current = AppConstant.createAbortController();
  }

  useEffect(() => {
    const controller = controllerRef.current;
    return () => {
      if (controller) {
        controller.abort();
        AppConstant.removeAbortController(controller);
      }
    };
  }, []);

  return {
    signal: controllerRef.current.signal,
    controller: controllerRef.current,
    abort: () => controllerRef.current?.abort(),
  };
};

export default useApiCancellation;
