import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import '@testing-library/jest-dom';
import { Card } from './Card';

const mockOnClick = vi.fn();

const mockCardData = {
  id: 1,
  artistTitle: 'Claude Monet',
  dateDisplay: '1889',
  imageId: 'image123',
  placeOfOrigin: 'France',
  title: 'Water Lilies',
};

describe('test card component', () => {
  it('renders card correctly with provided data', () => {
    render(
      <Provider store={store}>
        <Card {...mockCardData} onClick={mockOnClick} />
      </Provider>
    );

    expect(screen.getByText(/Water Lilies/i)).toBeDefined();
    expect(screen.getByText(/Claude Monet/i)).toBeDefined();
    expect(screen.getByText(/France/i)).toBeDefined();
    expect(screen.getByText(/1889/i)).toBeDefined();

    const image = screen.getByAltText(/Water Lilies/i);
    expect(image).toBeDefined();
    expect(image).toHaveAttribute('src', expect.stringContaining('image123'));
  });

  it('calls onClick when card is clicked', () => {
    render(
      <Provider store={store}>
        <Card {...mockCardData} onClick={mockOnClick} />
      </Provider>
    );

    fireEvent.click(screen.getByRole('listitem'));

    expect(mockOnClick).toHaveBeenCalledWith(mockCardData.id);
  });
});
