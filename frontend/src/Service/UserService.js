import axios from 'axios';
import localforage from 'localforage';

const localhost = 'http://localhost:4200/user/';
const server = 'https://134.209.115.188:4200/alimentary-api/user/';

const address = server;

class UserService {

  // Sends user/password data for authentication, if authentication successful adds Json Web Token to local storage with localforage
  sendLoginData(data, callback) {
      const headers = {
          'Content-Type': 'application/json'
      }
      axios.post(address+'signin/', {
        user: data.userValue,
        password: data.passwordValue
      }, { headers })
            .then(res => {
              if ( res !== null || undefined ) 
              {
                  localforage.setItem('token', res.data.token)
                      .then( () => {
                          return localforage.getItem('token');
                      })
                      .then( value => {
                          console.log('You have successfully logged in');
                          callback();
                      })
                      .catch( err => {});
              } else {
                  alert('You need to login to add items');
              }
            })
            .catch( err => {
              console.log(err);
            })
    }

//   sendLoginData(data) {
//     axios.post('http://localhost:4200/user/signin/', {
//       email: data.userValue,
//       password: data.passwordValue
//     })
//           .then(res => {
//             console.log(res);
//           })
//           .catch( err => {
//             console.log(err);
//           })
//   }

}

export default UserService;