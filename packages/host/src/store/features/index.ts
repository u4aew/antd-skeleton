import { combineReducers } from '@reduxjs/toolkit';
import common from './common/slice';
import auth from './auth/slice';
import register from './register/slice';

const rootReducer = combineReducers({
  common,
  auth,
  register,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
