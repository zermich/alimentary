import React, { Component } from 'react';
// import ItemService from '../Service/ItemService';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import TableRow from './TableRow';
import requireAuthentication from './Authenticator';
import AddItem from './AddItem';

const ItemAction = requireAuthentication(AddItem);

class Homepage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: ''
      // categories: []
    };
    this.updateItemList = this.updateItemList.bind(this);
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
        // for(let i=0; i<res.data.length; i++) {
        //   if(res.data[i].category != null) {
        //     this.state.categories.push(res.data[i].category);
        //   }
        // }
      })
      .catch(err => {
        console.log(err);
      });
  }

  tableRow() {
    if(this.state.items instanceof Array) {
      return this.state.items.map( (object, i) => {
        return <TableRow obj={object} key={i} callbackFromHomepage={this.updateItemList} />;
      })
    }
  }

  render() {
    return (
      <div className='container'>
        <h1>Alimentary</h1>
        {/* <UserContainer /> */}
        <ItemAction callbackFromHomepage={this.updateItemList} />
        <table className='table table-striped'>
          <thead>
            <tr>
              <td>Purchased</td>
              <td>Item</td>
              <td>Quantity</td>
              <td>Notes</td>
              <td>User</td>
              <td>Date Added</td>
            </tr>
          </thead>
          <tbody>
            {this.tableRow()}
          </tbody>
          <tfoot>
            {/* <tr>
              <td colSpan="5">
                <Link to={'/add-item'} className='btn btn-primary'>Add Item</Link>
                <Link to={'/login'} className='btn btn-primary'>Login</Link>
              </td>
            </tr> */}
          </tfoot>
        </table>
      </div>
    )
  }

}

export default withRouter(Homepage);
