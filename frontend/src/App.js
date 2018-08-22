import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store/configureStore';
import Routes from './routes/Routes';

export const store = configureStore();

class App extends Component {
  render() {
    return(
      <Provider store={store}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
