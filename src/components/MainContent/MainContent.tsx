import styles from './MainContent.module.css';
import { Component, ReactNode } from 'react';
import Card from '../Card/Card';
import { getArtworks } from '../../api/apiService';

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
};

class MainContent extends Component<unknown, State> {
  state: State = {
    artworks: [],
  };

  componentDidMount(): void {
    getArtworks().then((data) => {
      this.setState({ artworks: data });
    });
  }

  render(): ReactNode {
    return (
      <main className={styles.main}>
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
      </main>
    );
  }
}

export default MainContent;
