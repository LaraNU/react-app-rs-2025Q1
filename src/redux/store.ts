import { configureStore } from '@reduxjs/toolkit';
import selectedCardsSlice from './createSlice';

export const store = configureStore({
  reducer: {
    selectedCards: selectedCardsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
