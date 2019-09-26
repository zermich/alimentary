import React, { Component } from 'react';
import injectSheet from 'react-jss';
import ItemService from '../Service/ItemService';
import { Link } from 'react-router-dom';

import { ItemsContainerStyles } from '../jss/ItemsContainer.styles';

import ItemRow from './ItemRow';

class ItemsContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
        items: ''
    }
    this.addItemService = new ItemService();
    this.updateItemList = this.updateItemList.bind(this);
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
      return this.state.items.map( (object, i) => {
        return <ItemRow obj={object} key={i} callbackFromItemsContainer={this.updateItemList}/>;
      })
    }
  }


  render() {

    const { classes } = this.props;
    
    return(
      <div>
          <h1 className={ classes.siteName }>Alimentary</h1>
          
          <Link to={'/add-item'}><span className={classes.addItemBtn}><i className='material-icons'>add_circle</i></span></Link>
          <div className={classes.itemsListContainer}>
            {this.itemRow()}
          </div>
      </div>
    );
  }
}

export default injectSheet(ItemsContainerStyles)(ItemsContainer);
