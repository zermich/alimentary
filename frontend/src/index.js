import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Homepage from './components/Homepage';
import AddItem from './components/AddItem';
import EditItem from './components/EditItem';
import Login from './components/User/Login';
import requireAuthentication from './components/Authenticator';

ReactDOM.render(
  <Router>
    <div>
      <Route exact path='/' component={Homepage} />
      <Route path='/add-item' component={requireAuthentication(AddItem)} />
      <Route path='/edit/:id' component={EditItem} />
      <Route path='/login' component={Login} />

    </div>
  </Router>,
  document.getElementById('root'));
