import { Fetch } from '@host/types';

/**
 * Has request to user info
 * @param state
 */
export const isLoadingAuthSelector = (state): boolean => {
  return state.auth.fetchingState === Fetch.Pending;
};

/**
 * Has request to user info
 * @param state
 */
export const authTokenSelector = (state) => {
  return state.auth.token;
};
