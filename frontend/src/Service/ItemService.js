import axios from 'axios';

const localhost = 'http://localhost:4200/alimentary-api/items/';
// const server = 'https://www.alimentary.cc/alimentary-api/items/';

const address = localhost;

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
    axios.get(address + id)
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
    return axios.put(address+id, {
      item: data.item,
      user: data.user,
      quantity: data.quantity,
      notes: data.notes,
      category: data.category
    });
  }

  // Updates item isPurchased value
  updateToggle(data, id) {
    axios.put(address+id, {
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
    return axios.delete(address+id)
    .then(res => {
      console.debug('success');
      successCallback(res);
    })
    .catch(err => {
      console.error(err);
    });
  }
}

export default ItemService;
