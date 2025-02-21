import { configureStore } from '@reduxjs/toolkit';
import selectedCardsSlice from './createSlice';
import { artworksApi } from './apiSlice';

export const store = configureStore({
  reducer: {
    selectedCards: selectedCardsSlice,
    [artworksApi.reducerPath]: artworksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(artworksApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
