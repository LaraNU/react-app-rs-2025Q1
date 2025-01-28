import './App.css';
import { Component } from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';

type State = {
  query: string;
  searchPerformed: boolean;
};

class App extends Component<unknown, State> {
  state: State = {
    query: '',
    searchPerformed: false,
  };

  componentDidMount(): void {
    const savedQuery = localStorage.getItem('searchValue');
    if (savedQuery) {
      this.setState({ query: savedQuery });
    }
  }

  handleSearch = (query: string) => {
    this.setState({ query, searchPerformed: true });
  };

  render() {
    return (
      <>
        <Header onSearch={this.handleSearch} />
        <Main
          query={this.state.query}
          searchPerformed={this.state.searchPerformed}
        />
        <Footer />
      </>
    );
  }
}

export default App;
