import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { HomePage } from './HomePage';
import { ThemeProvider } from '../../utils/ThemeProvider';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

describe('test home page component', () => {
  it('renders home page correctly', () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <Provider store={store}>
            <HomePage />
          </Provider>
        </MemoryRouter>
      </ThemeProvider>
    );
  });
});
