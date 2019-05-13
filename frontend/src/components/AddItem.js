import React, { Component } from 'react';
import ItemService from '../Service/ItemService';
import {withRouter} from 'react-router-dom';
import localforage from 'localforage';

import Login from './User/Login';

class AddItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      item: '',
      user: '',
      quantity: '',
      notes: '',
      category: 'other',
      logOut: false
    };
    this.addItemService = new ItemService();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  // Removes token from local storage and sets this.state.logOut to true
  handleLogout(e) {
    e.preventDefault();

    localforage.removeItem('token').then( () => {
        this.setState({
          logOut: true
        });
        console.log('Token removed');
    }).catch( (err) => {
        console.log(err);
    });
  }

  // Changes state for target input, sets this.state.user from props
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      user: this.props.user
    })
  }

  // Sends updated item data from state to db
  handleSubmit(event) {
    event.preventDefault();
    const itemData = { item: this.state.item, user: this.state.user, quantity: this.state.quantity, notes: this.state.notes, category: this.state.category};
    this.addItemService.sendData(itemData, res => {
      this.props.history.push({
        pathname: '/'
      });
      this.props.callbackFromHomepage("List updated from AddItem");
    });
  }
  
  render() {
    if(this.state.logOut) {
      return ( <Login /> );
    }
    return(
      <div className="container">
        <p>You are logged in as: {this.props.user}</p>
        <button type="submit" onClick={this.handleLogout}>Logout</button>
        <form onSubmit={this.handleSubmit}>
          <label>
            Add Item:
            <input type="text" name="item" value={this.state.item} onChange={this.handleChange} className="form-control" />
          </label><br/>
          <label>
            Category:&nbsp;
            <select name="category" onChange={this.handleChange}>
              <option value='other'>Other</option>
              <option value='bakery'>Bakery</option>
              <option value='baking'>Baking</option>
              <option value='condiments'>Condiments</option>
              <option value='dairy'>Dairy</option>
              <option value='deli'>Deli</option>
              <option value='frozen'>Frozen</option>
              <option value='home'>Home</option>
              <option value='meat'>Meat</option>
              <option value='produce'>Produce</option>
            </select>
          </label><br />
          <label>
            Quantity:
            <input type="text" name="quantity" value={this.state.quantity} onChange={this.handleChange} className="form-control" />
          </label><br/>
          <label>
            Notes:
            <textarea type="text" name="notes" value={this.state.notes} onChange={this.handleChange} className="form-control" />
          </label><br/>
          <input type="submit" value="Submit" className="btn btn-primary" />
        </form>
      </div>
    );
  }
}

export default withRouter(AddItem);
