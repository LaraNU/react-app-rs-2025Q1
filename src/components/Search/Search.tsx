import styles from './Search.module.css';
import searchIcon from '../../assets/search-icon.svg';
import { useEffect } from 'react';
import { useState } from 'react';
import { FormEvent } from 'react';

type Props = {
  onSearch: (query: string) => void;
};

export const Search = (props: Props) => {
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const queryFromStorage = localStorage.getItem('searchValue');
    if (queryFromStorage) {
      setSearchValue(queryFromStorage);
    }
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const trimmedQuery = searchValue.trim();

    if (trimmedQuery === '') {
      localStorage.removeItem('searchValue');
      props.onSearch('');
    } else {
      localStorage.setItem('searchValue', trimmedQuery);
      props.onSearch(trimmedQuery);
    }
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Search"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchValue(e.target.value)
        }
        value={searchValue}
      />
      <button className={styles.searchBtn}>
        <img className={styles.searchIcon} src={searchIcon} alt="search" />
      </button>
    </form>
  );
};
