import axios from 'axios';

class UserService {

  sendLoginData(data) {
    axios.post('http://localhost:4200/user/signin/', {
      email: data.userValue,
      password: data.passwordValue
    })
          .then(res => {
            console.log(res);
          })
          .catch( err => {
            console.log(err);
          })
  }

}

export default UserService;