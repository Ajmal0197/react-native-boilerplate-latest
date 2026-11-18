/**
 * AppConstant
 *
 * Global runtime static helper for shared screen states and app-level constants.
 */
class AppConstant {
  static appVersion: string = '101';
  static currentHomeScreenPageId: string | number | null = null;

  static setCurrentHomeScreenPageId(
    currentHomeScreenPageId: string | number | null,
  ): void {
    this.currentHomeScreenPageId = currentHomeScreenPageId;
  }

  static getCurrentHomeScreenPageId(): string | number | null {
    return this.currentHomeScreenPageId;
  }

  static reset(): void {
    this.currentHomeScreenPageId = null;
  }
}

export { AppConstant };
export default AppConstant;
