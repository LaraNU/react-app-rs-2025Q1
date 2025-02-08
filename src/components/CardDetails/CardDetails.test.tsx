import { describe, it, vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { CardDetails } from './CardDetails';
import '@testing-library/jest-dom';

const onCloseMock = vi.fn();

vi.mock('../../api/apiService', () => ({
  fetchArtworkDetails: vi.fn().mockResolvedValue({
    artist_display: 'Monet',
    description: 'Description here',
    medium_display: 'Oil on canvas',
    short_description: 'Short description',
    style_title: 'Impressionism',
    title: 'Water Lilies',
    image_id: 'image_id',
    place_of_origin: 'France',
  }),
  getImageUrl: vi.fn().mockReturnValue('image_url'),
}));

describe('test card details component', () => {
  it('renders card details correctly with provided data', () => {
    render(<CardDetails id={1} onClose={onCloseMock} />);
  });

  it('fetches and displays artwork details', async () => {
    render(<CardDetails id={1} onClose={() => {}} />);

    await waitFor(() => screen.getByText(/Water Lilies/i));

    expect(screen.getByText(/Water Lilies/i)).toBeInTheDocument();
    expect(screen.getByText(/Monet/i)).toBeInTheDocument();
    expect(screen.getByText(/Oil on canvas/i)).toBeInTheDocument();
  });

  it('hides the card when the close button is clicked', async () => {
    render(<CardDetails id={1} onClose={() => {}} />);

    await waitFor(() => screen.getByText(/Water Lilies/i));

    const closeBtn = screen.getByText(/X/i);

    fireEvent.click(closeBtn);

    await waitFor(() =>
      expect(screen.queryByText(/Water Lilies/i)).not.toBeInTheDocument()
    );
  });
});
