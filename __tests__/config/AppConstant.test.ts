import { AppConstant } from '@config/AppConstant';

describe('AppConstant', () => {
  beforeEach(() => {
    AppConstant.reset();
  });

  it('provides default appVersion and initial null pageId', () => {
    expect(AppConstant.appVersion).toBe('101');
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

  it('resets currentHomeScreenPageId to null', () => {
    AppConstant.setCurrentHomeScreenPageId('temp_page');
    expect(AppConstant.getCurrentHomeScreenPageId()).toBe('temp_page');

    AppConstant.reset();
    expect(AppConstant.getCurrentHomeScreenPageId()).toBeNull();
  });
});
