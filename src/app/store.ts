import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import robotsReducer from '../features/robots/robotsSlice';
import votesReducer from '../features/votes/votesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    robots: robotsReducer,
    votes: votesReducer,
  },
  devTools: true
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
