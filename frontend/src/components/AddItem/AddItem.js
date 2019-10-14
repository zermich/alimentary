import React, { Component } from 'react';
import ItemService from '../../Service/ItemService';
import { Link, Redirect } from 'react-router-dom';
import localforage from 'localforage';
import injectSheet from 'react-jss';

import { EditItemStyles } from '../EditItem/EditItem.styles';

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
    }).catch( (err) => {
        console.error(err);
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
      return (<Redirect to="/login"/>);
    }

    const { classes } = this.props;
    
    const checkUserLogin = (this.props.user === '' ? '' : `You are logged in as: ${this.props.user}` );

    return(
      <div className={ classes.editItemContainer }>
        <div>{checkUserLogin}</div>
        <button type="submit" onClick={this.handleLogout} className={ classes.btn }>Logout</button><br/><br/>
        <form onSubmit={this.handleSubmit}>
          <label className={ classes.labels }>
            Add Item:
            <input autoFocus type="text" name="item" value={this.state.item} onChange={this.handleChange} className={ `form-control ${classes.noZoom}`} />
          </label><br/>
          <label className={ classes.labels }>
            Category:&nbsp;
          </label><br />
          <select name="category" onChange={this.handleChange} className={ classes.noZoom }>
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
          </select><br/><br/>
          <label className={ classes.labels }>
            Quantity:
            <input type="text" name="quantity" value={this.state.quantity} onChange={this.handleChange} className={ `form-control ${classes.noZoom}` } />
          </label><br/>
          <label className={ classes.labels }>
            Notes:
            <textarea type="text" name="notes" value={this.state.notes} onChange={this.handleChange} className={ `form-control ${classes.noZoom}` } />
          </label><br/>
          <div className={ classes.btnContainer }>
            <input type="submit" value="Submit" className={ `${classes.btn} ${classes.noZoom}` } />
            <Link to='/' className={ `${classes.btn} ${classes.btnLink}` }>Cancel</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default injectSheet(EditItemStyles)(AddItem);
