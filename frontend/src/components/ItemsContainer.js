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
  }

  componentDidMount() {
    this.addItemService.fetchAllItems( res => {
      this.setState({ items: res.data });
    });
  }

  itemRow() {
    if(this.state.items instanceof Array) {
      return this.state.items.map( (object, i) => {
        return <ItemRow obj={object} key={i} />;
      })
    }
  }


  render() {

    // const { classes } = this.props;
    
    return(
      <div>
          <Link to={'/add-item'}><i className='material-icons'>add_circle</i></Link>
          {this.itemRow()}
      </div>
    );
  }
}

export default injectSheet(ItemsContainerStyles)(ItemsContainer);
