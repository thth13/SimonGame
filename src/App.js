import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';

import Game from './components/Game';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Game />
      </Provider>
    );
  }
}

export default App;