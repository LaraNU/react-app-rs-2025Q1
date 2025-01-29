import styles from './CardsList.module.css';
import { Component, ReactNode } from 'react';
import { Card } from '../Card/Card';
import { Loader } from '../Loader/Loader';
import { fetchArtworks } from '../../api/apiService';

type CardProps = {
  artist_title: string;
  date_display: string;
  id: number;
  image_id: string;
  place_of_origin: string;
  title: string;
};

type State = {
  artworks: Array<CardProps>;
  loaded: boolean;
};

type Props = {
  query: string;
  searchPerformed: boolean;
};

export class CardsList extends Component<Props, State> {
  state: State = {
    artworks: [],
    loaded: false,
  };

  componentDidMount(): void {
    this.fetchData(this.props.query);
  }

  componentDidUpdate(prevProps: Props): void {
    if (prevProps.query !== this.props.query) {
      this.fetchData(this.props.query);
    }
  }

  fetchData = async (query: string) => {
    const storageQuery = localStorage.getItem('searchValue');
    if (storageQuery) {
      const data = await fetchArtworks(storageQuery);
      this.setState({ artworks: data, loaded: true });
    } else {
      const data = await fetchArtworks(query);
      this.setState({ artworks: data, loaded: true });
    }
  };

  render(): ReactNode {
    return (
      <>
        {!this.state.loaded ? <Loader /> : false}
        {this.props.searchPerformed && this.state.artworks.length === 0 && (
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
              image_id={artwork.image_id}
              title={artwork.title}
              artist_title={artwork.artist_title}
              place_of_origin={artwork.place_of_origin}
              date_display={artwork.date_display}
            />
          ))}
        </ul>
      </>
    );
  }
}
