import { describe, it, vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { CardDetails } from './CardDetails';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import '@testing-library/jest-dom';

const onCloseMock = vi.fn();

vi.mock('../../redux/apiSlice', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../redux/apiSlice')>();

  return {
    ...actual,
    useSearchArtworkDetailsQuery: () => ({
      data: {
        data: {
          title: 'Water Lilies',
          artist_display: 'Monet',
          medium_display: 'Oil on canvas',
          place_of_origin: 'France',
          style_title: 'Impressionism',
          description: 'Description here',
          image_id: 'image_id',
        },
      },
      isLoading: false,
      isFetching: false,
      error: undefined,
    }),
  };
});

describe('test card details component', () => {
  const renderWithProvider = (ui: JSX.Element) =>
    render(<Provider store={store}>{ui}</Provider>);

  it('renders card details correctly with provided data', async () => {
    renderWithProvider(<CardDetails id={1} onClose={onCloseMock} />);

    await waitFor(() => screen.getByText(/Water Lilies/i));

    expect(screen.getByText(/Water Lilies/i)).toBeInTheDocument();
    expect(screen.getByText(/Monet/i)).toBeInTheDocument();
    expect(screen.getByText(/Oil on canvas/i)).toBeInTheDocument();
  });

  it('fetches and displays artwork details', async () => {
    renderWithProvider(<CardDetails id={1} onClose={() => {}} />);

    await waitFor(() => screen.getByText(/Water Lilies/i));

    expect(screen.getByText(/Water Lilies/i)).toBeInTheDocument();
    expect(screen.getByText(/Monet/i)).toBeInTheDocument();
    expect(screen.getByText(/Oil on canvas/i)).toBeInTheDocument();
  });

  it('hides the card when the close button is clicked', async () => {
    renderWithProvider(<CardDetails id={1} onClose={() => {}} />);

    await waitFor(() => screen.getByText(/Water Lilies/i));

    const closeBtn = screen.getByText(/X/i);

    fireEvent.click(closeBtn);

    await waitFor(() =>
      expect(screen.queryByText(/Water Lilies/i)).not.toBeInTheDocument()
    );
  });
});
