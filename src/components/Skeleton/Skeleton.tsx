import styles from './Skeleton.module.css';

export const Skeleton = (): React.JSX.Element => {
  return (
    <div className={styles.card}>
      <div className={styles.image}></div>
      <div className={styles.content}>
        <p className={styles.text}></p>
        <p className={styles.text}></p>
      </div>
    </div>
  );
};
