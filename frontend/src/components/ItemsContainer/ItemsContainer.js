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
    this.addItemService.fetchAllItems( res => {
      this.setState({ items: res.data });
    });
  }

  // Fetches items from database on props callback from child component
  updateItemList() {
    this.addItemService.fetchAllItems( res => {
      this.setState({ items: res.data });
    });
  }

  itemRow() {
    if(this.state.items instanceof Array) {

      const categories = [
        {
          name: 'other',
          items: []
        },
        {
          name: 'bakery',
          items: []
        },
        {
          name: 'baking',
          items: []
        },
        {
          name: 'condiments',
          items: []
        },
        {
          name: 'dairy',
          items: []
        },
        {
          name: 'deli',
          items: []
        },
        {
          name: 'frozen',
          items: []
        },
        {
          name: 'home',
          items: []
        },
        {
          name: 'meat',
          items: []
        },
        {
          name: 'produce',
          items: []
        },
      ]

      this.state.items.forEach( (object, i) => {
        for(let i=0; i < categories.length; i++) {
          if (object.category === categories[i].name) {
            categories[i].items.push(object)
          }
        }
      })


      return categories.map( (cat, i) => {
        
        if (cat.items.length !== 0){
          return cat.items.map( object => {
            console.log(object);
            return <ItemRow obj={object} key={object._id} callbackFromItemsContainer={this.updateItemList}/>
          })
          
        }
      })

      // return this.state.items.map( (object, i) => {
      //   return <ItemRow obj={object} key={i} callbackFromItemsContainer={this.updateItemList}/>;
      // })
    }
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
