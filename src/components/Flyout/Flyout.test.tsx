import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import flyoutReducer, { unselectAll, CardState } from '../../redux/createSlice';
import { Flyout } from './Flyout';

interface RootState {
  selectedCards: CardState;
}

function makeStore(
  preloadedState?: Partial<{
    selectedCards: { cards: number[]; isFlyoutVisible: boolean };
  }>
) {
  return configureStore({
    reducer: {
      selectedCards: flyoutReducer,
    },
    preloadedState: preloadedState as RootState,
  });
}

describe('Flyout component', () => {
  it('renders and shows the correct number of selected items when visible', () => {
    const store = makeStore({
      selectedCards: {
        cards: [1, 2, 3],
        isFlyoutVisible: true,
      },
    });

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    const text = screen.getByText((_, element) => {
      return element?.textContent === '3 items are selected';
    });
    expect(text).toBeDefined();

    const unselectBtn = screen.getByText(/unselect all/i);
    expect(unselectBtn).toBeDefined();
  });

  it('does not render when isFlyoutVisible = false', async () => {
    const store = makeStore({
      selectedCards: {
        cards: [1],
        isFlyoutVisible: false,
      },
    });

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(screen.queryByText(/items are selected/i)).not.toBeInTheDocument();
  });

  it('dispatches unselectAll when "Unselect all" button is clicked', () => {
    const store = makeStore({
      selectedCards: {
        cards: [10, 11, 12],
        isFlyoutVisible: true,
      },
    });

    const dispatchSpy = vi.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    const unselectBtn = screen.getByText(/unselect all/i);
    fireEvent.click(unselectBtn);

    expect(dispatchSpy).toHaveBeenCalledWith(unselectAll());
  });

  it('has a "Download" button (no action tested)', () => {
    const store = makeStore({
      selectedCards: {
        cards: [5],
        isFlyoutVisible: true,
      },
    });

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    const downloadBtn = screen.getByText(/download/i);
    expect(downloadBtn).toBeDefined();
  });
});
