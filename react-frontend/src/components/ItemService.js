import axios from 'axios';

class ItemService {

  sendData(data) {
    axios.post('http://localhost:4200/items/', {
      item: data.item,
      user: data.user
    })
          .then(res => {
            console.log(res);
          })
          .catch( err => {
            console.log(err);
          })
  }

  updateData(data, id) {
    return axios.put('http://localhost:4200/items/'+id, {
      item: data
    });
  }

  // updateToggle(data, id) {
  //   axios.put('http://localhost:4200/, {
  //     isPurchased: data
  //   })
  //         .then( res => {
  //           this.setState({
  //             items: res.data
  //           })
  //         })
  //         .catch( err => {
  //           console.log(err)
  //         })
  // }

  deleteData(id) {
    axios.delete('http://localhost:4200/items/'+id)
          .then(
            console.log('Deleted')
          )
          .catch( err => {
            console.log(err)
          })
  }
}

export default ItemService;
