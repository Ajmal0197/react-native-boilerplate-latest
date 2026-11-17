import { configureStore } from '@reduxjs/toolkit';
import rootReducer, { type RootState } from './rootReducer';

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Factory for creating an isolated Redux store instance.
 * Ideal for unit and integration testing with custom preloaded state.
 */
export const createTestStore = (preloadedState?: DeepPartial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState as unknown as RootState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

/**
 * Redux Toolkit Central App Store
 */
export const store = createTestStore();

export type { RootState };
export type AppStore = ReturnType<typeof createTestStore>;
export type AppDispatch = typeof store.dispatch;
