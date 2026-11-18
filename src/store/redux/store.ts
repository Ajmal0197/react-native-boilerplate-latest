import { configureStore } from '@reduxjs/toolkit';
import rootReducer, { type RootState } from './rootReducer';

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Factory for creating an isolated Redux store instance.
 * Keeps RTK's default middleware (serializability and immutability checks
 * run in development) so non-serializable state is caught early.
 */
export const createStore = (preloadedState?: DeepPartial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState as unknown as RootState,
  });

/**
 * Isolated store factory for unit and integration tests with custom preloaded state.
 */
export const createTestStore = createStore;

/**
 * Redux Toolkit Central App Store
 */
export const store = createStore();

export type { RootState };
export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = typeof store.dispatch;
