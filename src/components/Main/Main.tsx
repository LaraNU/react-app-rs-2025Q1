import styles from './Main.module.css';
import { Component, ReactNode } from 'react';
import CardsList from '../CardsList/CardsList';
import { ErrorButton } from '../ErrorButton/ErrorButton';

type Props = {
  query: string;
  searchPerformed: boolean;
};

class Main extends Component<Props> {
  render(): ReactNode {
    return (
      <main className={styles.main}>
        <div className="pageTitle">Monet Art Explorer</div>
        <CardsList
          query={this.props.query}
          searchPerformed={this.props.searchPerformed}
        />
        <ErrorButton />
      </main>
    );
  }
}

export default Main;
