import { useState } from 'react';
import styles from './ErrorButton.module.css';

export const ErrorButton = (): React.JSX.Element => {
  const [hasError, setError] = useState(false);

  const throwError = () => {
    setError(true);
  };

  if (hasError) {
    throw new Error('Sorry.. there was an error');
  }
  return (
    <button className={styles.errorBtn} onClick={throwError}>
      Error
    </button>
  );
};
