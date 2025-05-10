import styles from './Main.module.css';
import { CardsList } from '../CardsList/CardsList';
import { ErrorButton } from '../ErrorButton/ErrorButton';
import { Pagination } from '../Pagination/Pagination';
import { CardDetails } from '../CardDetails/CardDetails';
import { Flyout } from '../Flyout/Flyout';
import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { useSearchArtworksQuery } from '../../redux/apiSlice';

type Props = {
  query: string;
  searchPerformed: boolean;
};

export const Main = ({ query, searchPerformed }: Props): React.JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [isCardOpen, setIsCardOpen] = useState(false);

  const { data, error } = useSearchArtworksQuery({
    currPage: currentPage,
    title: query,
  });

  const transformedData =
    data?.data?.map(
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
    ) ?? [];

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
        {data && (
          <CardsList
            onClick={handleCardClick}
            query={query}
            isSearchPerformed={searchPerformed}
            artworks={transformedData}
          />
        )}
        <CardDetails id={selectedCardId} onClose={handleCardClose} />
      </div>

      {error && (
        <div className={styles.errorMessage}>
          <p>{`${error}`}</p>
        </div>
      )}

      {data && (
        <Pagination
          totalPages={data?.pagination.total_pages}
          currentPage={data?.pagination.current_page}
          onPageChange={handlePageChange}
        />
      )}
      <ErrorButton />
      <Flyout />
    </main>
  );
};
