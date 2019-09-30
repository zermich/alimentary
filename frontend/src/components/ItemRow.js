import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { Redirect } from 'react-router-dom';
import ItemService from '../Service/ItemService';
import moment from 'moment';
import Swipeout from 'rc-swipeout';
import 'rc-swipeout/assets/index.css';

import { ItemRowStyles } from '../jss/ItemRow.styles';

class ItemRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isPurchased: this.props.obj.isPurchased,
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
    
      // On checkbox click toggles isPurchased value in db
      handleCheckboxChange(event){
        this.setState(prevState => ({
          isPurchased: !prevState.isPurchased
        }), () => {
          this.addItemService.updateToggle(this.state.isPurchased, this.props.obj._id);
        });
      }


  render() {

    const { classes } = this.props;

    const checkboxStatus = this.state.isPurchased ? <i className='material-icons'>check_box</i> : <i className='material-icons'>check_box_outline_blank</i>;
    
    const redirectLink = `/item/${this.props.obj._id}`;

    if (this.state.redirect) {
      return (<Redirect push to={redirectLink} />);
    }

    return(
      
      <div className={classes.itemRowContainer}>
            {/* <input type='checkbox'
                    name='isPurchased'
                    className='checkbox'
            /> */}

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
                    {moment(this.props.obj.updatedAt).format('MM/DD/YYYY')}
                  </span>
                </div>
                {/* <div className={classes.itemIcons}>
                    <Link to={'/edit/'+this.props.obj._id}><i className='material-icons'>edit</i></Link>
                    <i className='material-icons' onClick={this.handleDelete}>delete</i>
                </div> */}
              </div>
          </Swipeout>
 
      </div>
    );
  }
}

export default injectSheet(ItemRowStyles)(ItemRow);
