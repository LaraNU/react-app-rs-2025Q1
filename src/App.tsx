import './App.css';
import { Component } from 'react';
import Header from './components/Header/Header';

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="frauncesFontLight">Monet Art Explorer</div>
      </>
    );
  }
}

export default App;
