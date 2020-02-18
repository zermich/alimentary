import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { Redirect } from 'react-router-dom';
import ItemService from '../../Service/ItemService';
import moment from 'moment';
import Swipeout from 'rc-swipeout';
import 'rc-swipeout/assets/index.css';

import { ItemRowStyles } from './ItemRow.styles';

class ItemRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
          redirect: false
        }
        this.addItemService = new ItemService();
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.redirectToEditItem = this.redirectToEditItem.bind(this);
      }

      redirectToEditItem(){
        this.setState({
          redirect: true
        })
      }
    
      // On delete button click runs callback on Homepage component to reload items from db
      handleDelete() {
        // event.preventDefault();
        this.addItemService.deleteData(this.props.obj._id, res => {
          this.props.callbackFromItemsContainer();
        });
      }
    
      // On checkbox click toggles isPurchased value in db, callback on Homepage refetches updated db items
      handleCheckboxChange(event){
        this.addItemService.updateToggle(!this.props.obj.isPurchased, this.props.obj._id, res => {
          this.props.callbackFromItemsContainer();
        });
      }


  render() {

    const { classes } = this.props;

    const checkboxStatus = this.props.obj.isPurchased ? <i className='material-icons'>check_box</i> : <i className='material-icons'>check_box_outline_blank</i>;
    
    const redirectLink = `/edit/${this.props.obj._id}`;

    if (this.state.redirect) {
      return (<Redirect push to={redirectLink} />);
    }

    return(
      
      <div className={classes.itemRowContainer}>
            <Swipeout
              left={[
                {
                  text: 'edit',
                  onPress:() => this.redirectToEditItem(),
                  style: { backgroundColor: '#47744A', color: 'white' },
                  className: `custom-class-1`
                }
              ]}
              right={[
                {
                  text: 'delete',
                  onPress:() => this.handleDelete(),
                  style: { backgroundColor: '#DB6865', color: 'white' },
                  className: `custom-class-1`
                }
              ]}
              onOpen={() => console.log('open')}
              onClose={() => console.log('close')}
            >
              <div onClick={this.handleCheckboxChange}>
                <div className={classes.itemHeader}>
                  <span className={classes.checkbox}>
                    {checkboxStatus}
                  </span>
                  <h2 className={classes.itemName}>{this.props.obj.item}</h2>
                </div>


                <p className={classes.itemQuantity}>
                      {this.props.obj.quantity}
                </p>

                <div className={classes.itemContent}>
                  <div className={this.props.obj.notes === '' ? classes.hideItemDetails : classes.itemDetails}>
                      {this.props.obj.notes}
                  </div>
                  <div className={this.props.obj.notes === '' ? classes.itemDetailsHidden : classes.userDetails}>
                    {this.props.obj.user} &nbsp;
                    <span className={classes.date}>
                      {moment(this.props.obj.updatedAt).format('l')}
                    </span>
                  </div>
                </div>
              </div>
            </Swipeout>
            <div className={ classes.desktopButtons}>
              <i className={'material-icons-two-tone'} onClick={this.redirectToEditItem}>edit</i>
              <i className='material-icons-two-tone' onClick={this.handleDelete}>delete</i>
            </div>
          </div>
          
      
    );
  }
}

export default injectSheet(ItemRowStyles)(ItemRow);
