import { combineReducers } from '@reduxjs/toolkit';
import common from './common/slice';
import auth from './auth/slice';

const rootReducer = combineReducers({
  common,
  auth,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
