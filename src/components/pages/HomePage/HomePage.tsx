import { Header } from '../../Header/Header';
import { Main } from '../../Main/Main';
import { Footer } from '../../Footer/Footer';
import { useQueryFromLS } from '../../../utils/useQueryFromLS';

export const HomePage = () => {
  const [query, setQuery, searchPerformed, setSearchPerformed] = useQueryFromLS(
    'searchValue',
    ''
  );

  const handleSearch = (query: string): void => {
    setQuery(query);
  };

  return (
    <>
      <Header onSearch={handleSearch} setSearchPerformed={setSearchPerformed} />
      <Main
        query={query}
        searchPerformed={searchPerformed}
        setSearchPerformed={setSearchPerformed}
      />
      <Footer />
    </>
  );
};
