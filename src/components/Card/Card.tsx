import styles from './Card.module.css';
import { Component, ReactNode } from 'react';

type CardProps = {
  artist_title: string;
  date_display: string;
  id: number;
  image_id: string;
  place_of_origin: string;
  title: string;
};

export class Card extends Component<CardProps, unknown> {
  render(): ReactNode {
    return (
      <li id={this.props.id.toString()} className={styles.card}>
        <div className={styles.cardImg}>
          <img
            src={`https://www.artic.edu/iiif/2/${this.props.image_id}/full/400,/0/default.jpg`}
            alt={this.props.title}
          />
        </div>
        <div className={styles.cardDesc}>
          <p className={styles.cardTitle}>
            {this.props.title}, {this.props.artist_title}
          </p>
          <p className={styles.cardDate}>
            {this.props.place_of_origin}, {this.props.date_display}
          </p>
        </div>
      </li>
    );
  }
}
