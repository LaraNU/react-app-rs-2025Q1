import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ErrorBoundary } from './ErrorBoundary';

const ProblemChild = () => {
  throw new Error('Uncaught error:');
};

describe('test error boundary component', () => {
  it('renders children components correctly', () => {
    render(
      <ErrorBoundary>
        <div>Child Component</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('renders error message when there is an error in a child component', () => {
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Something went wrong /i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /We're sorry, but something went wrong. Please try again later./i
      )
    ).toBeInTheDocument();
  });
});
