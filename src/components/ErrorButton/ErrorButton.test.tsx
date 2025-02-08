import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { ErrorButton } from './ErrorButton';

describe('test error button', () => {
  it('error button renders correctly', () => {
    render(<ErrorButton />);
    expect(screen.getByText(/Error/i)).toBeDefined();
  });

  it('throws an error when clicked', () => {
    render(<ErrorButton />);
    expect(() => {
      const button = screen.getByRole('button', { name: /error/i });

      fireEvent.click(button);
    }).toThrowError('Sorry.. there was an error');
  });
});
