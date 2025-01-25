import './App.css';
import { Component } from 'react';
import Header from './components/Header/Header';
import MainContent from './components/MainContent/MainContent';

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="frauncesFontLight">Monet Art Explorer</div>
        <MainContent />
      </>
    );
  }
}

export default App;
