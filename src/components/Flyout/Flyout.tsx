import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unselectAll, selectFlyoutVisibility } from '../../redux/createSlice';
import { RootState } from '../../redux/store';
import styles from './Flyout.module.css';

export const Flyout = () => {
  const dispatch = useDispatch();
  const selectedCards = useSelector(
    (state: RootState) => state.selectedCards.selectedCards
  );
  const isFlyoutVisible = useSelector(selectFlyoutVisibility);

  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const downloadRef = useRef<HTMLAnchorElement | null>(null);

  const handleDownload = () => {
    if (selectedCards.length === 0) return;

    const headers = ['ID', 'Name', 'Description', 'URL'];
    const rows = selectedCards.map((card) => [
      card.id,
      card.title,
      card.description,
      card.url,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    setDownloadUrl(url);

    setTimeout(() => {
      if (downloadRef.current) {
        downloadRef.current.click();
        URL.revokeObjectURL(url);
        setDownloadUrl(null);
      }
    }, 0);
  };

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
          <button onClick={handleDownload} className={styles.btn}>
            Download
          </button>
        </div>

        {downloadUrl && (
          <a
            ref={downloadRef}
            href={downloadUrl}
            download={`${selectedCards.length}_selected_items.csv`}
            style={{ display: 'none' }}
            data-testid="download-link"
          >
            Download
          </a>
        )}
      </div>
    )
  );
};
