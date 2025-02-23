import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { CardsList } from './CardsList';
import { Card } from '../../types/types';

const mockOnClick = vi.fn();

const mockCardData = {
  query: 'Mone',
  isSearchPerformed: true,
  artworks: [],
  isLoaded: true,
  errorMessage: 'An unexpected error occurred. Please try again later.',
};

describe('test cards list component', () => {
  it('renders cards list correctly with provided data', () => {
    render(
      <Provider store={store}>
        <CardsList {...mockCardData} onClick={mockOnClick} />
      </Provider>
    );
  });

  it('renders "no results" message when no artworks are found after search', () => {
    render(
      <Provider store={store}>
        <CardsList
          query="Mone"
          isSearchPerformed={true}
          artworks={[]}
          onClick={mockOnClick}
        />
      </Provider>
    );

    expect(
      screen.getByText(/Sorry, we couldn't find any results for your search/i)
    ).toBeInTheDocument();
  });

  it('renders the correct number of Card components when artworks are provided', () => {
    const mockArtworks: Card[] = [
      {
        id: 1,
        imageId: 'img1',
        title: 'Artwork 1',
        artistTitle: 'Artist 1',
        placeOfOrigin: 'Origin 1',
        dateDisplay: 'Date 1',
      },
      {
        id: 2,
        imageId: 'img2',
        title: 'Artwork 2',
        artistTitle: 'Artist 2',
        placeOfOrigin: 'Origin 2',
        dateDisplay: 'Date 2',
      },
    ];

    render(
      <Provider store={store}>
        <CardsList
          query="Mone"
          isSearchPerformed={true}
          artworks={mockArtworks}
          onClick={mockOnClick}
        />
      </Provider>
    );

    expect(screen.getAllByRole('listitem')).toHaveLength(mockArtworks.length);
    expect(screen.getByText(/Artwork 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Artwork 2/i)).toBeInTheDocument();
  });
});
