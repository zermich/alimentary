import React, { Component } from 'react';
// import ItemService from '../Service/ItemService';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';

import TableRow from './TableRow';
// import requireAuthentication from './Authenticator';
// import AddItem from './AddItem';
import UserContainer from './User/UserContainer';

// const ItemAction = requireAuthentication(AddItem);

class Homepage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: ''
    };
  }

  updateItemList() {
    axios.get('http://localhost:4200/items')
    .then(res => {
      this.setState({ items: res.data });
    })
    .catch(err => {
      console.log(err);
    });
  }

  componentDidMount() {
    axios.get('http://localhost:4200/items')
      .then(res => {
        this.setState({ items: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  tabRow() {
    if(this.state.items instanceof Array) {
      return this.state.items.map( (object, i) => {
        return <TableRow obj={object} key={i} />;
      })
    }
  }

  render() {
    return (
      <div className='container'>
        <h1>Alimentary</h1>
        <UserContainer />
        {/* <ItemAction /> */}
        <table className='table table-striped'>
          <thead>
            <tr>
              <td>Purchased</td>
              <td>Item</td>
              <td>User</td>
              <td>Date Added</td>
            </tr>
          </thead>
          <tbody>
            {this.tabRow()}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="5">
                <Link to={'/add-item'} className='btn btn-primary'>Add Item</Link>
                <Link to={'/login'} className='btn btn-primary'>Login</Link>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  }

}

export default withRouter(Homepage);
