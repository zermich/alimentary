import axios from 'axios';

class ItemService {

  fetchAllItems(successCallback){
    axios.get('http://localhost:4200/items/')
        .then(res => {
          console.debug('success');
          successCallback(res);
        })
        .catch(err => {
          console.error(err);
        });
  }

  fetchItem(id, successCallback){
    axios.get('http://localhost:4200/items/' + id)
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
    axios.post('http://localhost:4200/items/', {
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
    return axios.put('http://localhost:4200/items/'+id, {
      item: data.item,
      user: data.user,
      quantity: data.quantity,
      notes: data.notes,
      category: data.category
    });
  }

  // Updates item isPurchased value
  updateToggle(data, id) {
    axios.put('http://localhost:4200/items/'+id, {
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
    return axios.delete('http://localhost:4200/items/'+id)
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
