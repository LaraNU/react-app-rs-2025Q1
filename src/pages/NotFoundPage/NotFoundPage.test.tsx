import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { NotFoundPage } from './NotFoundPage';

describe('test not found page component', () => {
  it('renders page correctly', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );
  });
});
