import { Component, ReactNode } from 'react';
import styles from './Skeleton.module.css';

export class Skeleton extends Component {
  render(): ReactNode {
    return (
      <div className={styles.card}>
        <div className={styles.image}></div>
        <div className={styles.content}>
          <p className={styles.text}></p>
          <p className={styles.text}></p>
        </div>
      </div>
    );
  }
}
