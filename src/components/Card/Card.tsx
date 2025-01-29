import styles from './Card.module.css';
import { Component, ReactNode } from 'react';

export type CardProps = {
  artistTitle: string;
  dateDisplay: string;
  id: number;
  imageId: string;
  placeOfOrigin: string;
  title: string;
};

export class Card extends Component<CardProps, unknown> {
  render(): ReactNode {
    return (
      <li id={this.props.id.toString()} className={styles.card}>
        <div className={styles.cardImg}>
          <img
            src={`https://www.artic.edu/iiif/2/${this.props.imageId}/full/400,/0/default.jpg`}
            alt={this.props.title}
          />
        </div>
        <div className={styles.cardDesc}>
          <p className={styles.cardTitle}>
            {this.props.title}, {this.props.artistTitle}
          </p>
          <p className={styles.cardDate}>
            {this.props.placeOfOrigin}, {this.props.dateDisplay}
          </p>
        </div>
      </li>
    );
  }
}
