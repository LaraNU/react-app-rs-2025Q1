import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

export interface Card {
  id: number;
  title: string;
  description: string;
  url: string;
}

export interface CardState {
  selectedCards: Card[];
  isFlyoutVisible: boolean;
}

const initialState: CardState = {
  selectedCards: [],
  isFlyoutVisible: false,
};

export const selectedCardsSlice = createSlice({
  name: 'selectedCards',
  initialState,
  reducers: {
    toggleCardSelection: (state, action: PayloadAction<Card>) => {
      state.isFlyoutVisible = true;
      const index = state.selectedCards.findIndex(
        (c) => c.id === action.payload.id
      );

      if (index === -1) {
        state.selectedCards.push(action.payload);
      } else {
        state.selectedCards.splice(index, 1);
      }

      if (state.selectedCards.length === 0) {
        state.isFlyoutVisible = false;
      }
    },
    unselectAll: (state) => {
      state.selectedCards = [];
      state.isFlyoutVisible = false;
    },
  },
});

export const { toggleCardSelection, unselectAll } = selectedCardsSlice.actions;

export const selectCard = (state: RootState) =>
  state.selectedCards.selectedCards;
export const selectFlyoutVisibility = (state: RootState) =>
  state.selectedCards.isFlyoutVisible;

export default selectedCardsSlice.reducer;
