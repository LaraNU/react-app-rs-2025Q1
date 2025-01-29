import styles from './Footer.module.css';
import logoGithub from '../../assets/icon-github.svg';
import { Component, ReactNode } from 'react';

export class Footer extends Component {
  render(): ReactNode {
    return (
      <footer className={styles.footer}>
        <div className={styles.text}>Monet Art Explorer</div>
        <div className={styles.date}>2025</div>
        <a
          className={styles.link}
          href="https://github.com/LaraNU"
          target="_balnk"
        >
          <img src={logoGithub} alt="github" />
        </a>
      </footer>
    );
  }
}
