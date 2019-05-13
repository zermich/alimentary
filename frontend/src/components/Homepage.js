import React, { Component } from 'react';
import ItemService from '../Service/ItemService';
import { withRouter } from 'react-router-dom';

import TableRow from './TableRow';
import requireAuthentication from './Authenticator';
import AddItem from './AddItem';

// Runs the function requireAuthentication from Authenticator, asking for login info and validating before displaying AddItem component
const ItemAction = requireAuthentication(AddItem);

class Homepage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: ''
      // categories: []
    };
    this.addItemService = new ItemService();
    this.updateItemList = this.updateItemList.bind(this);
  }

  // Fetches items from database on props callback from child component
  updateItemList() {
    this.addItemService.fetchAllItems( res => {
      this.setState({ items: res.data });
    });
  }

  // Fetches items from database on component mount, adds res with items to state
  componentDidMount() {
    this.addItemService.fetchAllItems( res => {
      this.setState({ items: res.data });
        // for(let i=0; i<res.data.length; i++) {
        //   if(res.data[i].category != null) {
        //     this.state.categories.push(res.data[i].category);
        //   }
        // }
      });
  }

  // Maps through state items to create item row with TableRow component
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
          </tfoot>
        </table>
      </div>
    )
  }

}

export default withRouter(Homepage);
