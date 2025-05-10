import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router';
import { Provider } from 'react-redux';
import { vi } from 'vitest';
import { Main } from './Main';
import { store } from '../../redux/store';
import * as apiSlice from '../../redux/apiSlice';
import '@testing-library/jest-dom';
import { APIResponse } from '../../types/types';
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query';
import { TypedUseQuerySubscriptionResult } from '@reduxjs/toolkit/query/react';

const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid="location-display">{location.search}</div>;
};

const mockData = {
  data: {
    data: [
      {
        artist_title: 'Artist 1',
        date_display: '2020',
        id: 1,
        image_id: 'img1',
        place_of_origin: 'Place 1',
        title: 'Artwork 1',
      },
      {
        artist_title: 'Artist 2',
        date_display: '2021',
        id: 2,
        image_id: 'img2',
        place_of_origin: 'Place 2',
        title: 'Artwork 2',
      },
    ],
    pagination: {
      total_pages: 5,
      current_page: 1,
    },
  },
};

describe('Main Component', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('displays list of cards and pagination when data is available', async () => {
    vi.spyOn(apiSlice, 'useSearchArtworksQuery').mockReturnValue({
      data: mockData.data,
      error: null,
      isLoading: false,
      refetch: vi.fn(),
      isFetching: false,
      currentData: mockData.data,
      isError: false,
      isSuccess: true,
    } as TypedUseQuerySubscriptionResult<
      APIResponse,
      { currPage: number; title?: string },
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        Record<string, unknown>,
        FetchBaseQueryMeta
      >
    >);

    render(
      <MemoryRouter initialEntries={['/?page=1']}>
        <Provider store={store}>
          <Routes>
            <Route
              path="*"
              element={<Main query="Artwork" searchPerformed={true} />}
            />
          </Routes>
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Monet Art Explorer')).toBeInTheDocument();

    expect(await screen.findByText(/Artwork 1/i)).toBeInTheDocument();
    expect(await screen.findByText(/Artwork 2/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
  });

  it('displays an error message when the API query fails', () => {
    const errorMessage = 'Client error (404): Please check your request.';

    vi.spyOn(apiSlice, 'useSearchArtworksQuery').mockReturnValue({
      data: null,
      error: errorMessage,
      isLoading: false,
      refetch: vi.fn(),
      isFetching: false,
      currentData: null,
      isError: true,
      isSuccess: false,
    } as TypedUseQuerySubscriptionResult<
      APIResponse,
      { currPage: number; title?: string },
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        Record<string, unknown>,
        FetchBaseQueryMeta
      >
    >);

    render(
      <MemoryRouter initialEntries={['/?page=1']}>
        <Provider store={store}>
          <Routes>
            <Route
              path="*"
              element={<Main query="Artwork" searchPerformed={true} />}
            />
          </Routes>
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('updates search parameters when clicking on a card and closing details', async () => {
    vi.spyOn(apiSlice, 'useSearchArtworksQuery').mockReturnValue({
      data: mockData.data,
      error: null,
      isLoading: false,
      refetch: vi.fn(),
      isFetching: false,
      currentData: mockData.data,
      isError: false,
      isSuccess: true,
    } as TypedUseQuerySubscriptionResult<
      APIResponse,
      { currPage: number; title?: string },
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        Record<string, unknown>,
        FetchBaseQueryMeta
      >
    >);

    render(
      <MemoryRouter initialEntries={['/?page=1']}>
        <Provider store={store}>
          <Routes>
            <Route
              path="*"
              element={<Main query="Artwork" searchPerformed={true} />}
            />
          </Routes>
          <LocationDisplay />
        </Provider>
      </MemoryRouter>
    );

    const card = await screen.findByText(/Artwork 1/i);
    fireEvent.click(card);

    const closeButton = await screen.findByRole('button', { name: /x/i });
    expect(closeButton).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId('location-display').textContent).toContain(
        'details=1'
      );
    });

    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.getByTestId('location-display').textContent).not.toContain(
        'details='
      );
    });
  });
});
