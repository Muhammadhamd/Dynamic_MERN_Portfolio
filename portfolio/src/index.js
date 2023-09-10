import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from './App';
import Adminlogin from './component/adminlogin';

// Wrap your application in a Router and define your routes
ReactDOM.render(
 
     <App />,
   
  document.querySelector('#root')
);
