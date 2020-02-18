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
  itemRow( styleName ) { 
    const allItems = []
    for(let i=0; i < this.state.items.length; i++){
      let categoryName = this.state.items[i];
      allItems.push(<div className={styleName} key={i}>{categoryName._id}</div>)
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
        this.updateItemList();
      }
    );
  }


  render() {

    const { classes } = this.props;
    
    return(
      <div>
          <div className={ classes.siteNameContainer}>
            <h1 className={ classes.siteName }>Alimentary</h1>
          </div>
          
          <Link to={'/add-item'}><div className={classes.addItemBtn}>Add Item</div></Link>
          <div className={classes.itemsListContainer}>
            {this.itemRow( classes.categoryHeader)}
          </div>
          <div className={classes.addItemBtn} onClick={this.checkoutItems}>Checkout</div>
      </div>
    );
  }
}

export default injectSheet(ItemsContainerStyles)(ItemsContainer);
