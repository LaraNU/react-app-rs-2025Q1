import styles from './Card.module.css';
import { getImageUrl } from '../../utils/getImageUrl';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCardSelection } from '../../redux/createSlice';
import { RootState } from '../../redux/store';

type Props = {
  artistTitle: string;
  dateDisplay: string;
  id: number;
  imageId: string;
  placeOfOrigin: string;
  title: string;
  onClick: (id: number) => void;
};

export const Card = (props: Props): React.JSX.Element => {
  const selectedCards = useSelector(
    (state: RootState) => state.selectedCards.selectedCards
  );
  const isChecked = selectedCards.some((card) => card.id === props.id);
  const dispatch = useDispatch();

  const handleSelection = () => {
    dispatch(
      toggleCardSelection({
        id: props.id,
        title: props.title,
        description: `${props.artistTitle}, ${props.placeOfOrigin}, ${props.dateDisplay}`,
        url: getImageUrl(props.imageId, '400'),
      })
    );
  };

  return (
    <li
      onClick={() => props.onClick(props.id)}
      id={props.id.toString()}
      className={styles.card}
    >
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
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={isChecked}
          onChange={() => handleSelection()}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </li>
  );
};
