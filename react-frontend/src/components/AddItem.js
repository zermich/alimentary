import React, { Component } from 'react';
import ItemService from './ItemService';
import {withRouter} from 'react-router-dom';

class AddItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      item: '',
      user: ''
    };
    this.addItemService = new ItemService();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    return(
      <div className="container">
        <p>You are logged in as: {this.props.user}</p>
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
