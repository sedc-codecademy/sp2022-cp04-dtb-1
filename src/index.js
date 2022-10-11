import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

//React-Router-Dom
import { BrowserRouter as Router } from 'react-router-dom'

//Redux Toolkit Store
import {store} from './app/store'
import { Provider } from 'react-redux'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
    <Provider  store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  
);

