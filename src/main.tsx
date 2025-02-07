import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css';
import { App } from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary.tsx';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </StrictMode>
  );
} else {
  console.error('No root element found');
}
