import './App.css';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { Footer } from './components/Footer/Footer';
import { useQueryFromLS } from './utils/useQueryFromLS';

export const App = () => {
  const [query, setQuery, searchPerformed, setSearchPerformed] = useQueryFromLS(
    'searchValue',
    ''
  );

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
