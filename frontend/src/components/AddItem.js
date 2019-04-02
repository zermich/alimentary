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
      logOut: false
    };
    this.addItemService = new ItemService();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

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

  handleChange(event) {
    this.setState({
      item: event.target.value,
      user: this.props.user
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    const itemData = { item: this.state.item, user: this.state.user};
    this.addItemService.sendData(itemData, res => {
      this.props.history.push({
        pathname: '/'
      });
      console.log('Pushed to homepage');
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
            <input type="text" value={this.state.item} onChange={this.handleChange} className="form-control" />
          </label><br/>
          <input type="submit" value="Submit" className="btn btn-primary" />
        </form>
      </div>
    );
  }
}

export default withRouter(AddItem);
