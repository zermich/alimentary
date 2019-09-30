import axios from 'axios';

const server = 'http://localhost:4200/alimentary-api/items/';
// const server = 'https://www.alimentary.cc/alimentary-api/items/';

const address = server;

class ItemService {

  fetchAllItems(successCallback){
    axios.get(address)
        .then(res => {
          console.debug('success');
          successCallback(res);
        })
        .catch(err => {
          console.error(err);
        });
  }

  fetchItem(id, successCallback){
    axios.get(address + 'item/'+id)
        .then(res => {
          console.debug('success');
          successCallback(res);
        })
        .catch(err => {
          console.error(err);
        });
  }

  // Posts new item data
  sendData(data, successCallback) {
    axios.post(address, {
      item: data.item,
      user: data.user,
      quantity: data.quantity,
      notes: data.notes,
      category: data.category
    })
    .then(res => {
      console.debug('success');
      successCallback(res);
    })
    .catch(err => {
      console.error(err);
    });
  }

  // Updates item data
  updateData(data, id) {
    return axios.put(address+'item/'+id, {
      item: data.item,
      user: data.user,
      quantity: data.quantity,
      notes: data.notes,
      category: data.category
    });
  }

  // Updates item isPurchased value
  updateToggle(data, id) {
    axios.put(address+'item/'+id, {
      isPurchased: data
    })
          .then( res => {
            
          })
          .catch( err => {
            console.log(err)
          })
  }

  // Removes item from database
  deleteData(id, successCallback) {
    return axios.delete(address+'item/'+id)
    .then(res => {
      console.debug('success');
      successCallback(res);
    })
    .catch(err => {
      console.error(err);
    });
  }

  // Removes all items checked isPurchased true from databse
  checkout() {
    return axios.get(address+'checkout')
    .then(res => {
      console.log('Items deleted.');
    })
    .catch(err => {
      console.error(err);
    });
  }


}

export default ItemService;
