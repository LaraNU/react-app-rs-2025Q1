import { describe, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { CardsList } from './CardsList';

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
});
