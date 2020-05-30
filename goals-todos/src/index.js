import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ConnectedApp from './components/App';
import reducer from './reducers/index';
import middleware from './middleware/index';
import './index.css';

const store = createStore(reducer, middleware);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('root')
);
