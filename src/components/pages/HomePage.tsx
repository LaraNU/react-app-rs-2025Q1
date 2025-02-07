import { Header } from '../Header/Header';
import { Main } from '../Main/Main';
import { Footer } from '../Footer/Footer';
import { useQueryFromLS } from '../../utils/useQueryFromLS';

export const HomePage = () => {
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
