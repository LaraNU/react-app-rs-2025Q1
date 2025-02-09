import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import { Skeleton } from './Skeleton';

describe('test skeleton component', () => {
  it('renders skeleton correctly', () => {
    render(<Skeleton />);
  });
});
