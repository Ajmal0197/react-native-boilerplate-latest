import { AppConstant } from '@services/AppConstant';

describe('AppConstant', () => {
  beforeEach(() => {
    AppConstant.reset();
  });

  it('provides default appVersion and initial null pageId', () => {
    expect(AppConstant.appVersion).toBe('1.0.0');
    expect(AppConstant.getCurrentHomeScreenPageId()).toBeNull();
  });

  it('sets and gets currentHomeScreenPageId correctly with string', () => {
    AppConstant.setCurrentHomeScreenPageId('page_home_tab_1');
    expect(AppConstant.getCurrentHomeScreenPageId()).toBe('page_home_tab_1');
  });

  it('sets and gets currentHomeScreenPageId correctly with number', () => {
    AppConstant.setCurrentHomeScreenPageId(42);
    expect(AppConstant.getCurrentHomeScreenPageId()).toBe(42);
  });

  it('resets currentHomeScreenPageId, loader and requests on reset()', () => {
    AppConstant.setCurrentHomeScreenPageId('temp_page');
    AppConstant.showLoader('Loading...');
    expect(AppConstant.getCurrentHomeScreenPageId()).toBe('temp_page');
    expect(AppConstant.isLoading()).toBe(true);

    AppConstant.reset();
    expect(AppConstant.getCurrentHomeScreenPageId()).toBeNull();
    expect(AppConstant.isLoading()).toBe(false);
  });

  it('controls global loader with showLoader and hideLoader', () => {
    expect(AppConstant.isLoading()).toBe(false);

    AppConstant.showLoader('Please wait...');
    expect(AppConstant.isLoading()).toBe(true);

    AppConstant.hideLoader();
    expect(AppConstant.isLoading()).toBe(false);
  });

  it('handles concurrent loader calls with reference counting', () => {
    AppConstant.showLoader('Task 1');
    AppConstant.showLoader('Task 2');
    expect(AppConstant.isLoading()).toBe(true);

    // First hide decrements counter but keeps loader visible for Task 2
    AppConstant.hideLoader();
    expect(AppConstant.isLoading()).toBe(true);

    // Second hide reaches 0 and hides
    AppConstant.hideLoader();
    expect(AppConstant.isLoading()).toBe(false);
  });

  it('supports force hiding the loader immediately', () => {
    AppConstant.showLoader('Task 1');
    AppConstant.showLoader('Task 2');
    expect(AppConstant.isLoading()).toBe(true);

    AppConstant.hideLoader(true);
    expect(AppConstant.isLoading()).toBe(false);
  });

  it('tracks and aborts requests via cancelAllRequests()', () => {
    const controller1 = AppConstant.createAbortController();
    const controller2 = AppConstant.createAbortController();

    expect(controller1.signal.aborted).toBe(false);
    expect(controller2.signal.aborted).toBe(false);

    AppConstant.cancelAllRequests();

    expect(controller1.signal.aborted).toBe(true);
    expect(controller2.signal.aborted).toBe(true);
  });
});
