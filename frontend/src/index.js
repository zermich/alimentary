import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Homepage from './components/Desktop/Homepage';
import AddItem from './components/AddItem/AddItem';
import EditItem from './components/EditItem/EditItem';
import Login from './components/User/Login2';
import requireAuthentication from './components/Authenticator';
import ItemsContainer from './components/ItemsContainer/ItemsContainer';

ReactDOM.render(
  <Router>
    <div>
      <Route exact path='/' component={ItemsContainer} />
      <Route path='/add-item' component={requireAuthentication(AddItem)} />
      <Route path='/edit/:id' component={EditItem} />
      <Route path='/login' component={Login} />
      <Route path='/desktop' component={Homepage} />

    </div>
  </Router>,
  document.getElementById('root'));
