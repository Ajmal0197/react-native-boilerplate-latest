import { combineReducers } from '@reduxjs/toolkit';
import homeReducer from '@features/home/store/homeSlice';

const rootReducer = combineReducers({
  home: homeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
