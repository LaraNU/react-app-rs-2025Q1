import styles from './Main.module.css';
import { Component, ReactNode } from 'react';
import CardsList from '../CardsList/CardsList';

type Props = {
  query: string;
};

class Main extends Component<Props> {
  render(): ReactNode {
    return (
      <main className={styles.main}>
        <div className="pageTitle">Monet Art Explorer</div>
        <CardsList query={this.props.query} />
      </main>
    );
  }
}

export default Main;
