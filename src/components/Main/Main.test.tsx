import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Main } from './Main';

const mockMainData = {
  query: 'mone',
  searchPerformed: true,
};

describe('test main component', () => {
  it('renders main correctly with provided data', () => {
    render(
      <MemoryRouter>
        <Main {...mockMainData} />
      </MemoryRouter>
    );
  });
});
