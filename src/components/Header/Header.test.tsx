import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Header } from './Header';
import { ThemeProvider } from '../../utils/ThemeProvider';

const mockOnSearch = vi.fn();
const setSearchPerformedMock = vi.fn();

describe('test header component', () => {
  it('should call onSearch prop when search is performed', () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <Header
            onSearch={mockOnSearch}
            setSearchPerformed={setSearchPerformedMock}
          />
        </MemoryRouter>
      </ThemeProvider>
    );

    const input = screen.getByPlaceholderText(/Search/i);
    fireEvent.change(input, { target: { value: 'Monet' } });
    const form = screen.getByRole('form');
    fireEvent.submit(form);

    expect(mockOnSearch).toHaveBeenCalledWith('Monet');
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });
});
