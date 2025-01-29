import { Component, ReactNode } from 'react';
import styles from './ErrorButton.module.css';

export class ErrorButton extends Component {
  state = {
    hasError: false,
  };

  throwError = () => {
    this.setState({
      hasError: true,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      throw new Error('Sorry.. there was an error');
    }
    return (
      <button className={styles.errorBtn} onClick={this.throwError}>
        Error
      </button>
    );
  }
}
