import './App.css';
import { Component } from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';

type State = {
  query: string;
};

class App extends Component<unknown, State> {
  state: State = {
    query: '',
  };

  componentDidMount(): void {
    const savedQuery = localStorage.getItem('searchValue');
    if (savedQuery) {
      this.setState({ query: savedQuery });
    }
  }

  handleSearch = (query: string) => {
    this.setState({ query });
  };

  render() {
    return (
      <>
        <Header onSearch={this.handleSearch} />
        <Main query={this.state.query} />
      </>
    );
  }
}

export default App;
