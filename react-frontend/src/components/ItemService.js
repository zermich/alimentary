import axios from 'axios';

class ItemService {

  sendData(data) {
    axios.post('http://localhost:4200/items/add/post', {
      item: data
    })
          .then(res => {
            console.log(res);
          })
          .catch( err => {
            console.log(err);
          });
  }

}

export default ItemService;
