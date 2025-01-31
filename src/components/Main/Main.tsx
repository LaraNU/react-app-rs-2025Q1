import styles from './Main.module.css';
import { Component, ReactNode } from 'react';
import { CardsList } from '../CardsList/CardsList';
import { ErrorButton } from '../ErrorButton/ErrorButton';
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

type State = {
  artworks: Card[];
  isLoaded: boolean;
  errorMessage: string | null;
};

export class Main extends Component<Props, State> {
  state: State = {
    artworks: [],
    isLoaded: false,
    errorMessage: null,
  };

  componentDidMount(): void {
    this.fetchData(this.props.query);
  }

  componentDidUpdate(prevProps: Props): void {
    if (prevProps.query !== this.props.query) {
      this.fetchData(this.props.query);
      this.setState({ isLoaded: false });
    }
  }

  private fetchData = async (query: string): Promise<void> => {
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

      this.setState({ artworks: transformedData, isLoaded: true });
    } catch (error) {
      let message = '';
      if (error instanceof TypeError) {
        message = 'An unexpected error occurred. Please try again later.';
      } else {
        message = (error as Error).message;
      }

      this.setState({
        errorMessage: message,
        isLoaded: true,
      });
    }
  };

  render(): ReactNode {
    return (
      <main className={styles.main}>
        <h1 className="pageTitle">Monet Art Explorer</h1>
        <CardsList
          query={this.props.query}
          isSearchPerformed={this.props.searchPerformed}
          artworks={this.state.artworks}
          isLoaded={this.state.isLoaded}
          errorMessage={this.state.errorMessage}
        />
        <ErrorButton />
      </main>
    );
  }
}
