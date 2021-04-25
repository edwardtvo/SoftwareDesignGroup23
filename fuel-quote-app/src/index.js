import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './fonts/NotoSansSC-Medium.otf'
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './store/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { CookiesProvider } from "react-cookie";


import reduxThunk from 'redux-thunk'

function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (err) {
    console.log(err)
  }
}

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState)
  } catch (err) {
    console.log(err)
    return undefined;
  }
}

const persistedState = loadFromLocalStorage();

const store = createStore(reducers, persistedState, composeWithDevTools(
  applyMiddleware(reduxThunk)
));

ReactDOM.render(
  <CookiesProvider>
  <BrowserRouter>
    <Provider store={store}>
    <App />
    </Provider>,
  </BrowserRouter>
  </CookiesProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
