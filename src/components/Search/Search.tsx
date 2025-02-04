import styles from './Search.module.css';
import searchIcon from '../../assets/search-icon.svg';
import { useState } from 'react';
import { FormEvent } from 'react';
import { useQueryFromLS } from '../../utils/useQueryFromLS';

type Props = {
  onSearch: (query: string) => void;
};

export const Search = (props: Props) => {
  const [searchValue, setSearchValue] = useQueryFromLS('searchValue', '');
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const trimmedQuery = inputValue.trim();
    setSearchValue(trimmedQuery);
    props.onSearch(trimmedQuery);
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Search"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInputValue(e.target.value)
        }
        defaultValue={searchValue}
      />
      <button className={styles.searchBtn}>
        <img className={styles.searchIcon} src={searchIcon} alt="search" />
      </button>
    </form>
  );
};
