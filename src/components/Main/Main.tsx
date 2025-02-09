import styles from './Main.module.css';
import { CardsList } from '../CardsList/CardsList';
import { ErrorButton } from '../ErrorButton/ErrorButton';
import { Pagination } from '../Pagination/Pagination';
import { CardDetails } from '../CardDetails/CardDetails';
import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router';
import { fetchArtworks } from '../../api/apiService';
import { APIArtwork } from '../../types/types';

type Props = {
  query: string;
  searchPerformed: boolean;
  setSearchPerformed: (value: boolean) => void;
};

type Card = {
  artistTitle: string;
  dateDisplay: string;
  id: number;
  imageId: string;
  placeOfOrigin: string;
  title: string;
};

export const Main = ({
  query,
  searchPerformed,
  setSearchPerformed,
}: Props): React.JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [artworks, setArtworks] = useState<Card[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = useCallback(
    async (page: number, query: string): Promise<void> => {
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
        setSearchPerformed(false);
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
    },
    [setSearchPerformed]
  );

  useEffect(() => {
    const page = searchPerformed ? 1 : currentPage;
    fetchData(page, query);
    setIsLoaded(false);

    console.log(searchPerformed, 'searchPerformed');
  }, [query, currentPage, searchPerformed, fetchData]);

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  const handleCardClick = (id: number) => {
    setIsCardOpen(true);
    setSelectedCardId(id);
    setSearchParams({ page: currentPage.toString(), details: id.toString() });
  };

  const handleCardClose = () => {
    setIsCardOpen(false);
    setSelectedCardId(null);
    setSearchParams({ page: currentPage.toString() });
  };

  return (
    <main className={styles.main}>
      <h1 className="pageTitle">Monet Art Explorer</h1>
      <div
        className={
          isCardOpen ? styles.wrapperTwoColumns : styles.wrapperOneColumn
        }
      >
        <CardsList
          onClick={handleCardClick}
          query={query}
          isSearchPerformed={searchPerformed}
          artworks={artworks}
          isLoaded={isLoaded}
          errorMessage={errorMessage}
        />
        <CardDetails id={selectedCardId} onClose={handleCardClose} />
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
