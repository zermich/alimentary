import axios from 'axios';

class ItemService {

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

  updateData(data, id) {
    return axios.put('http://localhost:4200/items/'+id, {
      item: data.item,
      user: data.user,
      quantity: data.quantity,
      notes: data.notes,
      category: data.category
    });
  }

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
