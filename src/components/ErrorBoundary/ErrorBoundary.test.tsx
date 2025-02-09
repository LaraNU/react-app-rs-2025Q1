import { describe, expect, it } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ErrorBoundary } from './ErrorBoundary';

describe('test error boundary component', () => {
  it('renders children components correctly', async () => {
    act(() => {
      render(
        <ErrorBoundary>
          <div>Child Component</div>
        </ErrorBoundary>
      );
    });

    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('renders error message when there is an error in a child component', async () => {
    const ProblemChild = () => {
      throw new Error('Uncaught error:');
    };

    const originalError = console.error;
    console.error = vi.fn();

    act(() => {
      render(
        <ErrorBoundary>
          <ProblemChild />
        </ErrorBoundary>
      );
    });

    await waitFor(async () => {
      expect(screen.getByText(/Something went wrong /i)).toBeInTheDocument();
      expect(
        screen.getByText(
          /We're sorry, but something went wrong. Please try again later./i
        )
      ).toBeInTheDocument();
    });

    console.error = originalError;
  });
});
