import styles from './CardsList.module.css';
import { Component, ReactNode } from 'react';
import { Card, CardProps } from '../Card/Card';
import { Skeleton } from '../Skeleton/Skeleton';

type Props = {
  query: string;
  isSearchPerformed: boolean;
  artworks: Array<CardProps>;
  isLoaded: boolean;
  errorMessage: string | null;
};

export class CardsList extends Component<Props> {
  skeletonCards = () => {
    return Array.from({ length: 12 }, (_, index) => <Skeleton key={index} />);
  };

  render(): ReactNode {
    return (
      <>
        {this.props.errorMessage && (
          <div className={styles.errorMessage}>
            <p>{this.props.errorMessage}</p>
          </div>
        )}

        {this.props.isSearchPerformed && this.props.artworks.length === 0 && (
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
          {!this.props.isLoaded && this.skeletonCards()}

          {this.props.artworks.map((artwork) => (
            <Card
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
  }
}
