import { describe, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Pagination } from './Pagination';

describe('test pagination component', () => {
  const onPageChangeMock = vi.fn();

  beforeEach(() => {
    onPageChangeMock.mockClear();
  });

  it('renders pagination correctly with provided data', () => {
    render(
      <Pagination
        totalPages={5}
        currentPage={1}
        onPageChange={onPageChangeMock}
      />
    );

    for (let i = 1; i < 5; i += 1) {
      expect(screen.getByText(i)).toBeInTheDocument();
    }

    expect(screen.getByText(/«/i)).toBeInTheDocument();
    expect(screen.getByText(/»/i)).toBeInTheDocument();
  });

  it('should call onPageChange when a page number is clicked', () => {
    render(
      <Pagination
        totalPages={5}
        currentPage={3}
        onPageChange={onPageChangeMock}
      />
    );

    const pageButton = screen.getByText(2);
    fireEvent.click(pageButton);

    expect(onPageChangeMock).toHaveBeenCalledWith(2);
  });

  it('should navigate to previous page when "Previous" button is clicked', () => {
    render(
      <Pagination
        totalPages={5}
        currentPage={3}
        onPageChange={onPageChangeMock}
      />
    );

    const prevButton = screen.getByText(/«/i);
    fireEvent.click(prevButton);

    expect(onPageChangeMock).toHaveBeenCalledWith(2);
  });

  it('should navigate to next page when "Next" button is clicked', () => {
    render(
      <Pagination
        totalPages={5}
        currentPage={3}
        onPageChange={onPageChangeMock}
      />
    );

    const nextButton = screen.getByText(/»/i);
    fireEvent.click(nextButton);

    expect(onPageChangeMock).toHaveBeenCalledWith(4);
  });
});
