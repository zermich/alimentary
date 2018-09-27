import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AddItem from './components/AddItem';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import IndexItem from './components/IndexItem';

ReactDOM.render(
  <Router>
    <div>
      <Route exact path='/' component={App} />
      <Route path='/add-item' component={AddItem} />
      <Route path='/index' component={IndexItem} />
    </div>
  </Router>,
  document.getElementById('root'));
