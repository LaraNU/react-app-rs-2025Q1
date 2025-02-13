import styles from './Flyout.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { unselectAll, selectFlyoutVisibility } from '../../redux/createSlice';
import { RootState } from '../../redux/store';

export const Flyout = () => {
  const dispatch = useDispatch();
  const selectedCards = useSelector(
    (state: RootState) => state.selectedCards.cards
  );
  const isFlyoutVisible = useSelector(selectFlyoutVisibility);

  return (
    isFlyoutVisible && (
      <div
        className={`${styles.flyout} ${isFlyoutVisible ? styles.show : styles.hidden}`}
      >
        <p>
          <span>{selectedCards.length}</span> items are selected
        </p>
        <div>
          <button
            onClick={() => dispatch(unselectAll())}
            className={styles.btn}
          >
            Unselect all
          </button>
          <button className={styles.btn}>Download</button>
        </div>
      </div>
    )
  );
};
