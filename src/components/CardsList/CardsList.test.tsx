import { describe, it, vi } from 'vitest';
import { render } from '@testing-library/react';
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
    render(<CardsList {...mockCardData} onClick={mockOnClick} />);
  });
});
