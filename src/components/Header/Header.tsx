import styles from './Header.module.css';
import logo from '../../assets/logo.png';
import { Component, ReactNode } from 'react';
import Search from '../Search/Search';

class Header extends Component {
  render(): ReactNode {
    return (
      <div className={styles.header}>
        <div className={styles.logoWrapper}>
          <img src={logo} alt="logo" />
          <span className={styles.logoText}>Monet Art Explorer</span>
        </div>
        <Search />
      </div>
    );
  }
}

export default Header;
