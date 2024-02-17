import { Fetch } from '@host/types';

/**
 * Has request to user info
 * @param state
 */
export const isLoadingRegisterSelector = (state): boolean => {
  return state.register.fetchingState === Fetch.Pending;
};
