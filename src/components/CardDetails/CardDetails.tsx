import styles from './CardDetails.module.css';
import { getImageUrl } from '../../api/apiService';
import { useEffect, useState } from 'react';
import { useSearchArtworkDetailsQuery } from '../../redux/apiSlice';

type Props = {
  id: number | null;
  onClose: () => void;
};

export const CardDetails = ({ id, onClose }: Props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const {
    data: artwork,
    isLoading,
    isFetching,
  } = useSearchArtworkDetailsQuery(id ?? 0, {
    skip: id === null,
  });

  useEffect(() => {
    if (id) {
      setIsVisible(true);
    }
  }, [id]);

  const removeHtmlTags = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  const handleCardToggle = () => {
    setIsVisible(false);
    onClose();
  };

  return (
    <>
      {isVisible && (
        <div className={styles.cardDetails}>
          <div className={styles.wrapper}>
            <button
              onClick={() => handleCardToggle()}
              className={styles.closeBtn}
            >
              X
            </button>

            {isLoading || isFetching ? (
              <div className={styles.card}>
                <div className={styles.image}></div>
                <div className={styles.content}>
                  <p className={styles.text}></p>
                  <p className={styles.text}></p>
                </div>
              </div>
            ) : (
              artwork && (
                <>
                  <div className={styles.cardImg}>
                    <img
                      src={getImageUrl(artwork.data.image_id, '600')}
                      alt={artwork.data.title}
                    />
                  </div>
                  <div className={styles.cardDesc}>
                    <p className={styles.title}>
                      {artwork.data.title} , {artwork.data.place_of_origin}
                    </p>
                    <p className={styles.artistDisplay}>
                      {artwork.data.artist_display}
                    </p>
                    <p className={styles.mediumDisplay}>
                      <span>Medium:</span> {artwork.data.medium_display}
                    </p>
                    <p className={styles.styleTitle}>
                      <span>Style:</span> {artwork.data.style_title}
                    </p>
                    <p className={styles.description}>
                      <span>Description:</span>{' '}
                      {removeHtmlTags(artwork.data.description)}
                    </p>
                  </div>
                </>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
};
