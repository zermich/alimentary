import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';
import ItemService from '../Service/ItemService';
import moment from 'moment';

import { ItemRowStyles } from '../jss/ItemRow.styles';

class ItemRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isPurchased: this.props.obj.isPurchased
        }
        this.addItemService = new ItemService();
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
      }
    
      // On delete button click runs callback on Homepage component to reload items from db
      handleDelete(event) {
        event.preventDefault();
        this.addItemService.deleteData(this.props.obj._id, res => {
          this.props.callbackFromItemsContainer();
        });
      }
    
      // On checkbox click toggles isPurchased value in db
      handleCheckboxChange(event){
        this.setState({
          isPurchased: event.target.checked
        }, () => {
          this.addItemService.updateToggle(this.state.isPurchased, this.props.obj._id);
        });
      }


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
            <div className={classes.itemIcons}>
                <Link to={'/edit/'+this.props.obj._id}><i className='material-icons'>edit</i></Link>
                <i className='material-icons' onClick={this.handleDelete}>delete</i>
            </div>
          </div>
      </div>
    );
  }
}

export default injectSheet(ItemRowStyles)(ItemRow);
