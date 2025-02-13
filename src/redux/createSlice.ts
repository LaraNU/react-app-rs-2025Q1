import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

export interface CardState {
  cards: number[];
  isFlyoutVisible: boolean;
}

const initialState: CardState = {
  cards: [],
  isFlyoutVisible: false,
};

export const selectedCardsSlice = createSlice({
  name: 'selectedCards',
  initialState,
  reducers: {
    toggleCardSelection: (state, action: PayloadAction<number>) => {
      state.isFlyoutVisible = true;
      const cardIndex = state.cards.indexOf(action.payload);
      if (cardIndex === -1) {
        state.cards.push(action.payload);
      } else {
        state.cards.splice(cardIndex, 1);
      }
    },
    unselectAll: (state) => {
      state.cards = [];
      state.isFlyoutVisible = false;
    },
  },
});

export const { toggleCardSelection, unselectAll } = selectedCardsSlice.actions;

export const selectCard = (state: RootState) => state.selectedCards.cards;
export const selectFlyoutVisibility = (state: RootState) =>
  state.selectedCards.isFlyoutVisible;

export default selectedCardsSlice.reducer;
