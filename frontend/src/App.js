import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Header from './containers/Header';
import Main from './components/Main';

function App() {
  return (
    <Provider store={store} >
      <BrowserRouter>
        <div className="App">
          <Header />
          <Main />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
