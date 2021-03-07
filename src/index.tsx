import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './router/App';
import { all } from 'redux-saga/effects';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import rootReducer from './reducers'
import {productsSliceSaga} from './reducers/products'
function* entrySaga() {
  yield all([
    productsSliceSaga()
  ]);
}
const sagaMiddleware = createSagaMiddleware();
function configureStore() {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware, logger))
  );
  sagaMiddleware.run(entrySaga);
  return { store };
}

const {store} = configureStore()
ReactDOM.render(
 <Provider store={store}>
   <App />
 </Provider>,  
  document.getElementById('root')
);

