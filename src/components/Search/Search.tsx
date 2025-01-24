import styles from './Search.module.css';
import { Component, ReactNode } from 'react';

class Search extends Component {
  render(): ReactNode {
    return (
      <form className={styles.searchForm}>
        <input className={styles.input} type="text" placeholder="Search" />
        <button className={styles.searchBtn}>
          <img
            className={styles.searchIcon}
            src="/src/assets/search-icon.svg"
            alt="search"
          />
        </button>
      </form>
    );
  }
}

export default Search;
