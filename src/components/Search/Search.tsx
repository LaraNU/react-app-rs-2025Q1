import styles from './Search.module.css';
import searchIcon from '../../assets/search-icon.svg';
import { Component, ReactNode } from 'react';
import { FormEvent } from 'react';

type State = {
  searchValue: string;
};

type Props = {
  onSearch: (query: string) => void;
};

class Search extends Component<Props, State> {
  state: State = {
    searchValue: '',
  };

  componentDidMount(): void {
    const queryFromStorage = localStorage.getItem('searchValue');
    if (queryFromStorage) {
      this.setState({ searchValue: queryFromStorage });
    }
  }

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedQuery = this.state.searchValue.trim();

    if (trimmedQuery === '') {
      localStorage.removeItem('searchValue');
      this.props.onSearch('');
    } else {
      localStorage.setItem('searchValue', trimmedQuery);
      this.props.onSearch(trimmedQuery);
    }
  };

  render(): ReactNode {
    return (
      <form className={styles.searchForm} onSubmit={this.handleSubmit}>
        <input
          className={styles.input}
          type="text"
          placeholder="Search"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            this.setState({ searchValue: e.target.value })
          }
          value={this.state.searchValue}
        />
        <button className={styles.searchBtn}>
          <img className={styles.searchIcon} src={searchIcon} alt="search" />
        </button>
      </form>
    );
  }
}

export default Search;
