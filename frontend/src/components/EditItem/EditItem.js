import React, { Component } from 'react';
import injectSheet from 'react-jss';
import ItemService from '../../Service/ItemService';
import { Link, Redirect } from 'react-router-dom';
import localforage from 'localforage';

import { EditItemStyles } from './EditItem.styles';

class EditItem extends Component {

  constructor(props){
    super(props);
    this.state = {
      item: '',
      category: '',
      quantity: '',
      notes: '',
      user: '',
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
    }).catch( (err) => {
        console.error(err);
    });
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
    const capitalizeText = (input) => {
      return input.replace(/^(.)|\s(.)/g, $1 => {return $1.toUpperCase()});
    }
    const capitalizeFirstLetter = (input) => {
      return input.replace(/^(.)/g, $1 => {return $1.toUpperCase()});
    }
    const itemData = { item: capitalizeText(this.state.item), user: capitalizeText(this.state.user), quantity: capitalizeText(this.state.quantity), notes: capitalizeFirstLetter(this.state.notes), category: this.state.category};
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
    if(this.state.logOut) {
      return (<Redirect to="/login"/>);
    }

    const { classes } = this.props;

    const checkUserLogin = (this.props.user === '' ? '' : `You are logged in as: ${this.props.user}` );

    return (
      <div className={ classes.editItemContainer }>
        <div>{checkUserLogin}</div>
        <button type="submit" onClick={this.handleLogout} className={ classes.btn }>Logout</button><br/><br/>
        <form onSubmit={this.handleSubmit}>
          <label className={ classes.labels }>
            Edit Item:
            <input type='text' name='item' value={this.state.item} onChange={this.handleChange} className={ `form-control ${classes.noZoom}` } />
          </label><br/>
          <label className={ classes.labels }>
            Category:&nbsp;
          </label><br />
          <select name='category' value={this.state.category} onChange={this.handleChange} className={ classes.noZoom } >
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
            </select><br /><br />
          <label className={ classes.labels }>
            Quantity:
            <input type="text" name="quantity" value={this.state.quantity} onChange={this.handleChange} className={ `form-control ${classes.noZoom}` } />
          </label><br/>
          <label className={ classes.labels }>
            Notes:
            <textarea type="text" name="notes" value={this.state.notes} onChange={this.handleChange} className={ `form-control ${classes.noZoom}` } />
          </label><br/>
          <div className={ classes.btnContainer }>
            <input type='submit' value='Update' className={ `${classes.btn} ${classes.noZoom}` } />
            <Link to='/' className={ `${classes.btn} ${classes.btnLink}` }>Cancel</Link>
          </div>

        </form>
      </div>
    );
  }

}

export default injectSheet(EditItemStyles)(EditItem);
