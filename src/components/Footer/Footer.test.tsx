import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('test', () => {
  it('Footer renders correctly', () => {
    render(<Footer />);
    expect(screen.getByText(/Monet Art Explorer/i)).toBeDefined();
  });

  it('Displays the year 2025', () => {
    expect(screen.getByText(/2025/i)).toBeDefined();
  });

  it('GitHub link is correct', () => {
    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toHaveProperty('href', 'https://github.com/LaraNU');

    const githubIcon = screen.getByAltText(/github/i);
    expect(githubIcon).toBeTruthy();
  });
});
