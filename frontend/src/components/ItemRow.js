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
          isPurchased: false
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
        // this.setState(prevState => ({
        //   isPurchased: !prevState.isPurchased
        // }), () => {
        //   this.addItemService.updateToggle(this.state.isPurchased, this.props.obj._id);
        // });
        this.setState(prevState => ({
          isPurchased: !prevState.isPurchased
        }));
      }


  render() {

    const { classes } = this.props;

    const checkboxStatus = this.state.isPurchased ? <i className='material-icons'>check_box</i> : <i className='material-icons'>check_box_outline_blank</i>;
    
    return(
      <div className={classes.itemRowContainer}>
            {/* <input type='checkbox'
                    name='isPurchased'
                    className='checkbox'
            /> */}
            
        <div className={classes.itemHeader}>
          <span className={classes.checkbox} onClick={this.handleCheckboxChange}>
            {checkboxStatus}
          </span>
          <h2 className={classes.itemName}>{this.props.obj.item}</h2>
          <p className={classes.itemQuantity}>
            {this.props.obj.quantity}
          </p>
        </div>



        <div className={classes.itemContent}>
            <div className={classes.itemDetails}>
                {this.props.obj.notes}
            </div>
            <div className={classes.userDetails}>
              {this.props.obj.user} &nbsp;
              <span className={classes.date}>
                {moment(this.props.obj.createdAt).format('MM/DD/YYYY')}
              </span>
            </div>
            {/* <div className={classes.itemIcons}>
                <Link to={'/edit/'+this.props.obj._id}><i className='material-icons'>edit</i></Link>
                <i className='material-icons' onClick={this.handleDelete}>delete</i>
            </div> */}
          </div>
      </div>
    );
  }
}

export default injectSheet(ItemRowStyles)(ItemRow);
