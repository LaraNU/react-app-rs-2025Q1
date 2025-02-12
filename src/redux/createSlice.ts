import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

export interface CardState {
  cards: number[];
}

const initialState: CardState = {
  cards: [],
};

export const selectedCardsSlice = createSlice({
  name: 'selectedCards',
  initialState,
  reducers: {
    toggleCardSelection: (state, action: PayloadAction<number>) => {
      const cardIndex = state.cards.indexOf(action.payload);
      if (cardIndex === -1) {
        state.cards.push(action.payload);
      } else {
        state.cards.splice(cardIndex, 1);
      }
    },
  },
});

export const { toggleCardSelection } = selectedCardsSlice.actions;

export const selectCard = (state: RootState) => state.selectedCards.cards;

export default selectedCardsSlice.reducer;
