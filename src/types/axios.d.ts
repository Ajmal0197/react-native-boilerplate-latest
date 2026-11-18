import 'axios';

declare module 'axios' {
  interface AxiosRequestConfig {
    /** When true, the global client suppresses automatic error toasts for this request. */
    silent?: boolean;
  }
}
