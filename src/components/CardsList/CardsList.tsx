import styles from './CardsList.module.css';
import { Card } from '../Card/Card';
import { Card as CardType } from '../../types/types';
import { Skeleton } from '../Skeleton/Skeleton';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

type Props = {
  query: string;
  isSearchPerformed: boolean;
  artworks: CardType[];
  onClick: (id: number) => void;
};

export const CardsList = (props: Props): React.JSX.Element => {
  const isLoading = useSelector((state: RootState) => state.artworks.loading);

  const skeletonCards = () => {
    return Array.from({ length: 12 }, (_, index) => <Skeleton key={index} />);
  };

  return (
    <>
      {props.isSearchPerformed && props.artworks.length === 0 && !isLoading && (
        <div className={styles.notFoundMsg}>
          <p className={styles.textMsg}>
            Sorry, we couldn&apos;t find any results for your search &#128577;
          </p>
          <p className={styles.textExp}>
            Try searching for other famous artworks, such as:{' '}
            <span>Bordighera,</span> <span>Water Lilies,</span>{' '}
            <span>Cliff Walk at Pourville</span> and etc
          </p>
          <p className={styles.textExp}>
            This might help you discover something interesting!
          </p>
        </div>
      )}

      <ul className={styles.cardsList}>
        {isLoading && skeletonCards()}

        {props.artworks.map((artwork) => (
          <Card
            onClick={props.onClick}
            key={artwork.id}
            id={artwork.id}
            imageId={artwork.imageId}
            title={artwork.title}
            artistTitle={artwork.artistTitle}
            placeOfOrigin={artwork.placeOfOrigin}
            dateDisplay={artwork.dateDisplay}
          />
        ))}
      </ul>
    </>
  );
};
