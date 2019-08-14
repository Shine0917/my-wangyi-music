import React from 'react';
import {Provider} from 'react-redux';
import store from './store/index';
import { HashRouter} from 'react-router-dom';
import { GlobalStyle } from './style';
import { IconStyle} from './assets/iconfont/iconfont';
import './fix.css';
import {renderRoutes} from 'react-router-config';
import routes from './routes/index'
function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        {renderRoutes(routes)}
      </HashRouter>
    </Provider>
  );
}

export default App;
