import React, { Component } from 'react';
import axios from 'axios';
import ItemService from './ItemService';

class EditItem extends Component {

  constructor(props){
    super(props);
    this.addItemService = new ItemService();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      items: ''
    };
  }

  componentDidMount(){
    axios.get('http://localhost:4200/items/edit/'+this.props.match.params.id)
          .then( res => {
            this.setState({
              items: res.data
            });
          })
          .catch ( err => {
            console.log(err);
          })
  }

  handleChange(event) {
    this.setState({
      items: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.addItemService.updateData(this.state.items, this.props.match.params.id);
    this.props.history.push('/');
  }

  render() {
    return (
      <div className='container'>
        <form onSubmit={this.handleSubmit}>
          <label>
            Edit Item:
            <input type='text' value={this.state.items.item} onChange={this.handleChange} className='form-control' />
          </label><br/>
          <input type='submit' value='Update' className='btn btn-primary' />
        </form>
      </div>
    );
  }

}

export default EditItem;
