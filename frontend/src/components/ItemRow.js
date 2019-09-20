import React, { Component } from 'react';
import injectSheet from 'react-jss';
import moment from 'moment';

import { ItemRowStyles } from '../jss/ItemRow.styles';

class ItemRow extends Component {



  render() {

    const { classes } = this.props;
    
    return(
      <div className={classes.itemRowContainer}>

            <input type='checkbox'
                    name='isPurchased'
            />

        <div className={classes.itemContent}>
            
            <h2 className={classes.itemName}>{this.props.obj.item}</h2>

            <p className={classes.itemDetails}>
                {this.props.obj.quantity}
                <br/>
                {this.props.obj.notes}
                <br/>
                {this.props.obj.user}
                <br/>
                {moment(this.props.obj.createdAt).format('MM/DD/YYYY')}
            </p>
          </div>
      </div>
    );
  }
}

export default injectSheet(ItemRowStyles)(ItemRow);
