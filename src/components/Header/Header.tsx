import styles from './Header.module.css';
import logo from '../../assets/logo.png';
import { Search } from '../Search/Search';

type Props = {
  onSearch: (query: string) => void;
};

export const Header = ({ onSearch }: Props): React.JSX.Element => {
  return (
    <div className={styles.header}>
      <div className={styles.logoWrapper}>
        <img src={logo} alt="logo" />
        <span className={styles.logoText}>Monet Art Explorer</span>
      </div>
      <Search onSearch={onSearch} />
    </div>
  );
};
