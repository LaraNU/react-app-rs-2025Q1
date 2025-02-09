import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { HomePage } from './HomePage';

describe('test home page component', () => {
  it('renders home page correctly', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
  });
});
