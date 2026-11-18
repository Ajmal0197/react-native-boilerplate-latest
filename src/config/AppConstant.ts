import { GlobalLoader } from '../components/organisms/GlobalLoader';
import { Toast, ToastOptions } from '../components/organisms/Toast';

/**
 * AppConstant
 *
 * Global static helper for application-level state, runtime constants,
 * loader controls, native toast notifications, and network request cancellation orchestration.
 */
class AppConstant {
  static appVersion: string = '101';
  static currentHomeScreenPageId: string | number | null = null;

  private static abortControllers = new Set<AbortController>();

  // ─── Screen Tracking ──────────────────────────────────────────────────────
  static setCurrentHomeScreenPageId(
    currentHomeScreenPageId: string | number | null,
  ): void {
    this.currentHomeScreenPageId = currentHomeScreenPageId;
  }

  static getCurrentHomeScreenPageId(): string | number | null {
    return this.currentHomeScreenPageId;
  }

  // ─── Global Loader Controls ──────────────────────────────────────────────
  /**
   * Display global application loader from anywhere in the app.
   * Supports concurrent calls via reference counting.
   * @param message Optional message to display below spinner
   */
  static showLoader(message?: string): void {
    GlobalLoader.show(message);
  }

  /**
   * Hide global application loader.
   * Decrements active loader count; fully hides overlay when count reaches 0 or force is true.
   * @param force If true, immediately forces loader to close regardless of active operations
   */
  static hideLoader(force: boolean = false): void {
    GlobalLoader.hide(force);
  }

  /**
   * Check if global loader is currently visible
   */
  static isLoading(): boolean {
    return GlobalLoader.isVisible();
  }

  // ─── Global Toast Controls ───────────────────────────────────────────────
  /**
   * Show a native-like floating toast notification
   */
  static showToast(options: ToastOptions): void {
    Toast.show(options);
  }

  /**
   * Helper to display an error toast
   */
  static showErrorToast(message: string, title: string = 'Network Error'): void {
    Toast.error(message, title);
  }

  /**
   * Hide the active toast notification immediately
   */
  static hideToast(): void {
    Toast.hide();
  }

  // ─── Network Cancellation / Stop API Calls ───────────────────────────────
  /**
   * Create an AbortController tracked by AppConstant
   */
  static createAbortController(): AbortController {
    const controller = new AbortController();
    this.abortControllers.add(controller);
    return controller;
  }

  /**
   * Untrack an AbortController
   */
  static removeAbortController(controller: AbortController): void {
    this.abortControllers.delete(controller);
  }

  /**
   * Cancel / abort all pending tracked API calls across the entire application
   */
  static cancelAllRequests(): void {
    this.abortControllers.forEach(controller => {
      try {
        controller.abort();
      } catch {
        // Safe guard against already aborted controllers
      }
    });
    this.abortControllers.clear();
  }

  // ─── Global Reset ────────────────────────────────────────────────────────
  /**
   * Reset all global runtime state, dismiss loader, and abort pending requests
   */
  static reset(): void {
    this.currentHomeScreenPageId = null;
    GlobalLoader.reset();
    Toast.hide();
    this.cancelAllRequests();
  }
}

export { AppConstant };
export default AppConstant;
