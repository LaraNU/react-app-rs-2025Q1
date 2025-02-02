import './App.css';
import { useState, useEffect } from 'react';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { Footer } from './components/Footer/Footer';

export const App = () => {
  const [query, setQuery] = useState<string>('');
  const [searchPerformed, setSearchPerformed] = useState<boolean>(false);

  useEffect(() => {
    const savedQuery = localStorage.getItem('searchValue');
    if (savedQuery) {
      setQuery(savedQuery);
    }
  }, []);

  const handleSearch = (query: string): void => {
    setQuery(query);
    setSearchPerformed(true);
  };

  return (
    <>
      <Header onSearch={handleSearch} />
      <Main query={query} searchPerformed={searchPerformed} />
      <Footer />
    </>
  );
};
