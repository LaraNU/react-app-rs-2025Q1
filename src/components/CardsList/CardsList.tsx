import styles from './CardsList.module.css';
import { Component, ReactNode } from 'react';
import { Card, CardProps } from '../Card/Card';
import { Loader } from '../Loader/Loader';
import { fetchArtworks } from '../../api/apiService';

type APIArtwork = {
  artist_title: string;
  date_display: string;
  id: number;
  image_id: string;
  place_of_origin: string;
  title: string;
};

type State = {
  artworks: Array<CardProps>;
  isLoaded: boolean;
};

type Props = {
  query: string;
  isSearchPerformed: boolean;
};

export class CardsList extends Component<Props, State> {
  state: State = {
    artworks: [],
    isLoaded: false,
  };

  componentDidMount(): void {
    this.fetchData(this.props.query);
  }

  componentDidUpdate(prevProps: Props): void {
    if (prevProps.query !== this.props.query) {
      this.fetchData(this.props.query);
    }
  }

  private fetchData = async (query: string) => {
    const storageQuery = localStorage.getItem('searchValue');
    let data: APIArtwork[] = [];

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

    this.setState({ artworks: transformedData, isLoaded: true });
  };

  render(): ReactNode {
    return (
      <>
        {!this.state.isLoaded ? <Loader /> : false}
        {this.props.isSearchPerformed && this.state.artworks.length === 0 && (
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
          {this.state.artworks.map((artwork) => (
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
