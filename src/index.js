import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter as Router } from "react-router-dom";
import { PUBLIC_URL } from "../src/configs/Contants.js";

import { Provider } from 'react-redux'
import {store} from './redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
ReactDOM.render(
  <Provider store={store}>
    <Router basename={PUBLIC_URL}>
      <ToastContainer newestOnTop theme='dark'/>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
