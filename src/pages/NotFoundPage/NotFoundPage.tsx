import { Link } from 'react-router';
import styles from './NotFoundPage.module.css';

export const NotFoundPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.noPageWrapper}>
        <span className={styles.noPageNumber}>404</span>
        <span className={styles.noPageText}>Page Not Found</span>
        <Link className={styles.noPageBtn} to="/">
          Go to Home Page
        </Link>
      </div>
    </div>
  );
};
