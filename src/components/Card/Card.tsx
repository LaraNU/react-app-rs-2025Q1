import styles from './Card.module.css';
import { getImageUrl } from '../../api/apiService';

type Props = {
  artistTitle: string;
  dateDisplay: string;
  id: number;
  imageId: string;
  placeOfOrigin: string;
  title: string;
};

export const Card = (props: Props): React.JSX.Element => {
  return (
    <li id={props.id.toString()} className={styles.card}>
      <div className={styles.cardImg}>
        <img src={getImageUrl(props.imageId, '400')} alt={props.title} />
      </div>
      <div className={styles.cardDesc}>
        <p className={styles.cardTitle}>
          {props.title}, {props.artistTitle}
        </p>
        <p className={styles.cardDate}>
          {props.placeOfOrigin}, {props.dateDisplay}
        </p>
      </div>
    </li>
  );
};
