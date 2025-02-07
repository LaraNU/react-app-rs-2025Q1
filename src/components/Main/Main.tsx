import styles from './Main.module.css';
import { CardsList } from '../CardsList/CardsList';
import { ErrorButton } from '../ErrorButton/ErrorButton';
import { Pagination } from '../Pagination/Pagination';
import { CardDetails } from '../CardDetails/CardDetails';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { fetchArtworks } from '../../api/apiService';
import { APIArtwork } from '../../types/types';

type Props = {
  query: string;
  searchPerformed: boolean;
};

type Card = {
  artistTitle: string;
  dateDisplay: string;
  id: number;
  imageId: string;
  placeOfOrigin: string;
  title: string;
};

export const Main = ({ query, searchPerformed }: Props): React.JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page'));

  const [artworks, setArtworks] = useState<Card[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData(currentPage, query);
    setIsLoaded(false);
  }, [query, currentPage]);

  const fetchData = async (page: number, query: string): Promise<void> => {
    let data: APIArtwork[] = [];
    let fetch;

    try {
      fetch = await fetchArtworks(page, query);

      data = fetch.data;
      setTotalPages(fetch.pagination.total_pages);

      const transformedData = data.map(
        ({
          artist_title,
          date_display,
          id,
          image_id,
          place_of_origin,
          title,
        }) => ({
          artistTitle: artist_title,
          dateDisplay: date_display,
          id,
          imageId: image_id,
          placeOfOrigin: place_of_origin,
          title,
        })
      );

      setArtworks(transformedData);
      setIsLoaded(true);
    } catch (error) {
      let message = '';
      if (error instanceof TypeError) {
        message = 'An unexpected error occurred. Please try again later.';
      } else {
        message = (error as Error).message;
      }

      setErrorMessage(message);
      setIsLoaded(true);
    }
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  return (
    <main className={styles.main}>
      <h1 className="pageTitle">Monet Art Explorer</h1>
      <div className={styles.wrapper}>
        <CardsList
          query={query}
          isSearchPerformed={searchPerformed}
          artworks={artworks}
          isLoaded={isLoaded}
          errorMessage={errorMessage}
        />
        <CardDetails id={16571} />
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <ErrorButton />
    </main>
  );
};
