import './App.css';
import { HomePage } from './components/pages/HomePage/HomePage';
import { NotFoundPage } from './components/pages/NotFoundPage/NotFoundPage';
import { BrowserRouter, Routes, Route } from 'react-router';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<NotFoundPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};
