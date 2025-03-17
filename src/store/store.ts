import { configureStore, Middleware } from '@reduxjs/toolkit';
import userReducer from './userSlice';

// Debug middleware to log actions and state
const loggerMiddleware: Middleware = store => next => action => {
  console.log('Dispatching:', action);
  const result = next(action);
  console.log('Next State:', store.getState());
  return result;
};

// Configure the Redux store
export const store = configureStore({
  reducer: {
    auth: userReducer,
    // Add more reducers here as needed
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(loggerMiddleware),
});

// Infer the RootState and AppDispatch types from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 