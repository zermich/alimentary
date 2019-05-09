import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ItemService from '../Service/ItemService';
import moment from 'moment';

class TableRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isPurchased: this.props.obj.isPurchased
    }
    this.addItemService = new ItemService();
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  handleDelete(event) {
    event.preventDefault();
    this.addItemService.deleteData(this.props.obj._id, res => {
      this.props.callbackFromHomepage();
    });
  }

  handleCheckboxChange(event){
    this.setState({
      isPurchased: event.target.checked
    }, () => {
      this.addItemService.updateToggle(this.state.isPurchased, this.props.obj._id);
    });
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
          {this.props.obj.user}
        </td>
        <td>
          {moment(this.props.obj.createdAt).format('MM/DD/YYYY')}
        </td>
        <td>
          <Link to={'/edit/'+this.props.obj._id} className='btn btn-primary'>Edit</Link>
        </td>
        <td>
          <form onSubmit={this.handleDelete}>
            <input type='submit' value='Delete' className='btn btn-danger' />
          </form>
        </td>
      </tr>
    );
  }
}

export default TableRow;
