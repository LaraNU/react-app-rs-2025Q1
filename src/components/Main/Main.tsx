import styles from './Main.module.css';
import { CardsList } from '../CardsList/CardsList';
import { ErrorButton } from '../ErrorButton/ErrorButton';
import { useState, useEffect } from 'react';
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
  const [artworks, setArtworks] = useState<Card[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchData(query);
    setIsLoaded(false);
  }, [query]);

  const fetchData = async (query: string): Promise<void> => {
    const storageQuery = localStorage.getItem('searchValue');
    let data: APIArtwork[] = [];

    try {
      if (storageQuery) {
        data = await fetchArtworks(storageQuery);
      } else {
        data = await fetchArtworks(query);
      }

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

  return (
    <main className={styles.main}>
      <h1 className="pageTitle">Monet Art Explorer</h1>
      <CardsList
        query={query}
        isSearchPerformed={searchPerformed}
        artworks={artworks}
        isLoaded={isLoaded}
        errorMessage={errorMessage}
      />
      <ErrorButton />
    </main>
  );
};
