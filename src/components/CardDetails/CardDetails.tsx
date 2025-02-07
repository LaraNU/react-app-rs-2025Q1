import styles from './CardDetails.module.css';
import { getImageUrl, fetchArtworkDetails } from '../../api/apiService';
import { useEffect, useState } from 'react';

type ArtworkDetails = {
  artistDisplay: string;
  description: string;
  mediumDisplay: string;
  shortDescription: string;
  styleTitle: string;
  title: string;
  imageId: string;
  placeOfOrigin: string;
};

type Props = {
  id: number | null;
};

export const CardDetails = ({ id }: Props) => {
  const [artworks, setArtworks] = useState<ArtworkDetails | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    if (id !== null) {
      fetchData(id);
      setIsVisible(true);
    }
  }, [id]);

  const fetchData = async (id: number) => {
    const data = await fetchArtworkDetails(id);

    const transformedData: ArtworkDetails = {
      artistDisplay: data.artist_display || '-',
      description: data.description || '-',
      mediumDisplay: data.medium_display || '-',
      shortDescription: data.short_description || '-',
      styleTitle: data.style_title || '-',
      title: data.title || '-',
      imageId: data.image_id,
      placeOfOrigin: data.place_of_origin || '-',
    };

    setArtworks(transformedData);
  };

  const removeHtmlTags = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  if (!artworks) {
    return <div>Artwork not found.</div>;
  }

  return (
    <>
      {isVisible && (
        <div className={styles.cardDetails}>
          <div className={styles.wrapper}>
            <button
              onClick={() => setIsVisible(false)}
              className={styles.closeBtn}
            >
              X
            </button>
            <div className={styles.cardImg}>
              <img
                src={getImageUrl(artworks.imageId, '600')}
                alt={artworks.title}
              />
            </div>
            <div className={styles.cardDesc}>
              <p className={styles.title}>
                {artworks.title} , {artworks.placeOfOrigin}
              </p>
              <p className={styles.artistDisplay}>{artworks.artistDisplay}</p>
              <p className={styles.mediumDisplay}>
                <span>Medium:</span> {artworks.mediumDisplay}
              </p>
              <p className={styles.styleTitle}>
                <span>Style:</span> {artworks.styleTitle}
              </p>
              <p className={styles.description}>
                <span>Description:</span> {removeHtmlTags(artworks.description)}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
