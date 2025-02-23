import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { Main } from './Main';

const mockMainData = {
  query: 'mone',
  searchPerformed: true,
};

describe('test main component', () => {
  it('renders main correctly with provided data', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Main {...mockMainData} />
        </Provider>
      </MemoryRouter>
    );
  });
});
