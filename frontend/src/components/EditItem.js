import React, { Component } from 'react';
import axios from 'axios';
import ItemService from './Services/ItemService';

class EditItem extends Component {

  constructor(props){
    super(props);
    this.addItemService = new ItemService();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      item: ''
    };
  }

  componentDidMount(){
    axios.get('http://localhost:4200/items/' + this.props.match.params.id)
      .then( res => {
        this.setState({
          item: res.data.item
        });
      })
      .catch ( err => {
        console.log(err);
      });
  }

  handleChange(event) {
    this.setState({
      item: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.addItemService.updateData(this.state.item, this.props.match.params.id)
    .then( res => {
      this.setState({
        item: res.data.item
      }, () => {
        this.props.history.push('/');
      });
    })
    .catch( err => {
      console.log(err);
    });
  }

  render() {
    return (
      <div className='container'>
        <form onSubmit={this.handleSubmit}>
          <label>
            Edit Item:
            <input type='text' value={this.state.item} onChange={this.handleChange} className='form-control' />
          </label><br/>
          <input type='submit' value='Update' className='btn btn-primary' />
        </form>
      </div>
    );
  }

}

export default EditItem;
