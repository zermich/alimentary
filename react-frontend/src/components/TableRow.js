import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ItemService from './ItemService';
import moment from 'moment';

class TableRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isPurchased: false
    }
    this.addItemService = new ItemService();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.addItemService.deleteData(this.props.obj._id);
  }

  handleCheckboxChange(event){
    console.log('State is originally ' +this.state.isPurchased);
    const target = event.target;
    this.setState({
      isPurchased: target.checked
    }, () => {
      console.log(`State is now ${this.state.isPurchased}`);
    });

    //this.addItemService.updateToggle(this.state.isPurchased);
  }

  render() {
    return(
      <tr>
        <td>
          <input type='checkbox'
                  name='isPurchased'
                  checked={this.state.isPurchased}
                  onChange={this.handleCheckboxChange}
          />
        </td>
        <td>
          {this.props.obj.item}
        </td>
        <td>
          {moment(this.props.obj.createdAt).format('MM/DD/YYYY')}
        </td>
        <td>
          <Link to={'/edit/'+this.props.obj._id} className='btn btn-primary'>Edit</Link>
        </td>
        <td>
          <form onSubmit={this.handleSubmit}>
            <input type='submit' value='Delete' className='btn btn-danger' />
          </form>
        </td>
      </tr>
    );
  }
}

export default TableRow;
