import React, { Component } from 'react';
import ItemService from '../Service/ItemService';

class EditItem extends Component {

  constructor(props){
    super(props);
    this.state = {
      item: '',
      category: '',
      quantity: '',
      notes: ''
    };
    this.addItemService = new ItemService();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Fetches item data and sets state/fills in form
  componentDidMount(){
    this.addItemService.fetchItem(this.props.match.params.id, res => {
        this.setState({
          item: res.data.item,
          category: res.data.category,
          quantity: res.data.quantity,
          notes: res.data.notes
        });
    });
  }

  // Changes the state of the selected input
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // Sends updated state data to update item in db
  handleSubmit(event) {
    event.preventDefault();
    const itemData = { item: this.state.item, user: this.state.user, quantity: this.state.quantity, notes: this.state.notes, category: this.state.category};
    this.addItemService.updateData(itemData, this.props.match.params.id)
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
            <input type='text' name='item' value={this.state.item} onChange={this.handleChange} className='form-control' />
          </label><br/>
          <label>
            Category:&nbsp;
            <select name='category' value={this.state.category} onChange={this.handleChange}>
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
          <input type='submit' value='Update' className='btn btn-primary' />
        </form>
      </div>
    );
  }

}

export default EditItem;
