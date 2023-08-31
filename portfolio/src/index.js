import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from './App'; // Make sure the path is correct
import Adminlogin from './component/adminlogin'; // Make sure the path is correct

// Render your routes
ReactDOM.render(
  <App />, 

 
  document.querySelector('#root')
);