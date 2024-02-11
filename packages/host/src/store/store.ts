import { configureStore, Middleware } from '@reduxjs/toolkit';
import rootReducer, { RootState } from './features';

const localStorageKey = 'reduxState';

const stateToLocalStorageMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action) => {
    const result = next(action);
    // Сохраняем состояние в localStorage
    localStorage.setItem(localStorageKey, JSON.stringify(store.getState()));
    return result;
  };

const loadFromLocalStorage = (): RootState | undefined => {
  try {
    const serializedState = localStorage.getItem(localStorageKey);
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState) as RootState;
  } catch (e) {
    console.warn('Error loading state from localStorage:', e);
    return undefined;
  }
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stateToLocalStorageMiddleware),
  preloadedState: loadFromLocalStorage(),
});

export default store;

export type AppDispatch = typeof store.dispatch;
