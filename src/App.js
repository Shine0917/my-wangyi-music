import React from 'react';
import {Provider} from 'react-redux';
import store from './store/index';
import { HashRouter} from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        
      </HashRouter>
    </Provider>
  );
}

export default App;
