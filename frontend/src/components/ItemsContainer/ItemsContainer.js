import React, { Component } from 'react';
import injectSheet from 'react-jss';
import ItemService from '../../Service/ItemService';
import { Link } from 'react-router-dom';

import { ItemsContainerStyles } from './ItemsContainer.styles';

import ItemRow from '../ItemRow/ItemRow';

class ItemsContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
        items: ''
    }
    this.addItemService = new ItemService();
    this.updateItemList = this.updateItemList.bind(this);
    this.checkoutItems = this.checkoutItems.bind(this);
  }

  componentDidMount() {
    this.addItemService.fetchAndCategorizeItems( res => {
      this.setState({ items: res.data });
    });
  }

  // Fetches items from database on props callback from child component
  updateItemList() {
    this.addItemService.fetchAndCategorizeItems( res => {
      this.setState({ items: res.data });
    });
  }

  //Populates Categories & Items from database
  itemRow() {
    const categoryHeaderStyles = {
      fontFamily: 'Josefin Sans',
      fontSize: '2em',
      marginLeft: '.25em',
      marginBottom: '.5em',
      borderBottom: '.05em solid black',
      textTransform: 'uppercase',
    }

    const allItems = []
    for(let i=0; i < this.state.items.length; i++){
      let categoryName = this.state.items[i];
      allItems.push(<div style={categoryHeaderStyles} key={i}>{categoryName._id}</div>)
      allItems.push(
        categoryName.groupItems.map( (object, i) => {
            return <ItemRow obj={object} key={i} callbackFromItemsContainer={this.updateItemList}/>;
        })
      )
    }
    return allItems;
  }

  // Deletes items with isPurchased:true from db
  checkoutItems() {
    this.addItemService.checkout(
      res => {
        this.addItemService.fetchAllItems( res => {
          this.setState({ items: res.data });
        });
      }
    );
  }


  render() {

    const { classes } = this.props;
    
    return(
      <div>
          <h1 className={ classes.siteName }>Alimentary</h1>
          
          <Link to={'/add-item'}><div className={classes.addItemBtn}>Add Item</div></Link>
          <div className={classes.itemsListContainer}>
            {this.itemRow()}
          </div>
          <div className={classes.addItemBtn} onClick={this.checkoutItems}>Checkout</div>
      </div>
    );
  }
}

export default injectSheet(ItemsContainerStyles)(ItemsContainer);
