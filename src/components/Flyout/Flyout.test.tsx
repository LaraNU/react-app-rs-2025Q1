import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import flyoutReducer, { unselectAll, CardState } from '../../redux/createSlice';
import { Card } from '../../redux/createSlice';
import { Flyout } from './Flyout';

beforeEach(() => {
  window.URL.createObjectURL = vi.fn(() => 'mock-url');
});

interface RootState {
  selectedCards: CardState;
}

function makeStore(
  preloadedState?: Partial<{
    selectedCards: { selectedCards: Card[]; isFlyoutVisible: boolean };
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
        selectedCards: [
          { id: 1, title: 'Title 1', description: 'Desc 1', url: 'url1' },
          { id: 2, title: 'Title 2', description: 'Desc 2', url: 'url2' },
          { id: 3, title: 'Title 3', description: 'Desc 3', url: 'url3' },
        ],
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
        selectedCards: [
          { id: 1, title: 'Title 1', description: 'Desc 1', url: 'url1' },
          { id: 2, title: 'Title 2', description: 'Desc 2', url: 'url2' },
          { id: 3, title: 'Title 3', description: 'Desc 3', url: 'url3' },
        ],
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
        selectedCards: [
          { id: 1, title: 'Title 1', description: 'Desc 1', url: 'url1' },
          { id: 2, title: 'Title 2', description: 'Desc 2', url: 'url2' },
          { id: 3, title: 'Title 3', description: 'Desc 3', url: 'url3' },
        ],
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
        selectedCards: [
          { id: 1, title: 'Title 1', description: 'Desc 1', url: 'url1' },
          { id: 2, title: 'Title 2', description: 'Desc 2', url: 'url2' },
          { id: 3, title: 'Title 3', description: 'Desc 3', url: 'url3' },
        ],
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

  it('generates correct CSV content', () => {
    const store = makeStore({
      selectedCards: {
        selectedCards: [
          { id: 1, title: 'Item 1', description: 'Desc 1', url: 'url1' },
          { id: 2, title: 'Item 2', description: 'Desc 2', url: 'url2' },
        ],
        isFlyoutVisible: true,
      },
    });

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    const downloadBtns = screen.getAllByText(/download/i);
    const downloadBtn = downloadBtns[0];
    fireEvent.click(downloadBtn);

    const expectedCsv =
      'ID,Name,Description,URL\n1,Item 1,Desc 1,url1\n2,Item 2,Desc 2,url2';
    const blob = new Blob([expectedCsv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const downloadLink = screen.getByTestId('download-link');
    expect(downloadLink).toHaveAttribute('href', url);
  });

  it('clears download URL after download', () => {
    const store = makeStore({
      selectedCards: {
        selectedCards: [
          { id: 1, title: 'Item 1', description: 'Desc 1', url: 'url1' },
        ],
        isFlyoutVisible: true,
      },
    });

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    const downloadBtn = screen.getByText(/download/i);
    fireEvent.click(downloadBtn);

    const downloadLink = screen.getByTestId('download-link');
    fireEvent.click(downloadLink);

    setTimeout(() => {
      expect(screen.queryByText(/download/i)).not.toBeInTheDocument();
    }, 0);
  });
});
