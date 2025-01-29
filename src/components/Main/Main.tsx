import styles from './Main.module.css';
import { Component, ReactNode } from 'react';
import { CardsList } from '../CardsList/CardsList';
import { ErrorButton } from '../ErrorButton/ErrorButton';

type Props = {
  query: string;
  searchPerformed: boolean;
};

export class Main extends Component<Props> {
  render(): ReactNode {
    return (
      <main className={styles.main}>
        <h1 className="pageTitle">Monet Art Explorer</h1>
        <CardsList
          query={this.props.query}
          isSearchPerformed={this.props.searchPerformed}
        />
        <ErrorButton />
      </main>
    );
  }
}
