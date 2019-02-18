import React, { Component } from 'react';
import ItemService from './ItemService';

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
    this.addItemService.sendData(itemData);
    console.log('props are', this.props);
    this.props.history.push('/');
  }
  
  render() {
    return(
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <label>
            {this.props.user} Add Item:
            <input type="text" value={this.state.item} onChange={this.handleChange} className="form-control" />
          </label><br/>
          <input type="submit" value="Submit" className="btn btn-primary" />
        </form>
      </div>
    );
  }
}

export default AddItem;
