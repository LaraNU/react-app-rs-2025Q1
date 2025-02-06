import styles from './Pagination.module.css';

type Props = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: Props) => {
  const generatePageNumbers = () => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  };

  const handlePageChangeBack = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handlePageChangeNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={styles.pagination}>
      <button onClick={() => handlePageChangeBack()}>&laquo;</button>
      {generatePageNumbers().map((el, index) => (
        <button
          key={index}
          id={el.toString()}
          className={el === currentPage ? styles.active : ''}
          onClick={() => onPageChange(el)}
        >
          {el}
        </button>
      ))}
      <button onClick={() => handlePageChangeNext()}>&raquo;</button>
    </div>
  );
};
