import axios from 'axios';
import localforage from 'localforage';

class UserService {

    sendLoginData(data) {
        const headers = {
            'Content-Type': 'application/json'
        }
        axios.post('http://localhost:4200/user/signin/', {
          email: data.userValue,
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
                            alert('You have successfully logged in');
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