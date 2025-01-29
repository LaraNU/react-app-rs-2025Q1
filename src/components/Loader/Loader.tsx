import { Component, ReactNode } from 'react';
import styles from './Loader.module.css';

export class Loader extends Component {
  render(): ReactNode {
    return <div className={styles.loader}></div>;
  }
}
