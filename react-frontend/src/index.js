import React from 'react';
import ReactDOM from 'react-dom';
import AddItem from './components/AddItem';
import EditItem from './components/EditItem';
import Login from './components/Login';
import requireAuthentication from './components/Authenticator';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import IndexItem from './components/IndexItem';

ReactDOM.render(
  <Router>
    <div>
      <Route exact path='/' component={IndexItem} />
      <Route path='/add-item' component={requireAuthentication(AddItem)} />
      <Route path='/edit/:id' component={EditItem} />
      <Route path='/login' component={Login} />

    </div>
  </Router>,
  document.getElementById('root'));
