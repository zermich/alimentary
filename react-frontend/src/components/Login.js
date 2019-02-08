import React, { Component } from 'react';
import UserService from './UserService';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userValue: "",
            passwordValue: ""
        };
        this.addUserService = new UserService();
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleUserInput(event) {
        this.setState({
                userValue: event.target.value
        })
      }

      handlePasswordInput(event) {
        this.setState({
                passwordValue: event.target.value
        })
      }
    
      handleSubmit(event) {
        event.preventDefault();
        const user = { userValue: this.state.userValue, passwordValue: this.state.passwordValue};
        this.addUserService.sendLoginData(user);
      }

    render() {
        return (
            <form>
                <label>
                    Username:
                    <input type="text" name="user" value={this.state.userValue} onChange={ e => this.handleUserInput(e) } />
                </label><br/>
                <label>
                    Password:
                    <input type="text" name="password" value={this.state.passwordValue} onChange={ e => this.handlePasswordInput(e) } />
                </label><br/>
                <button type="submit" onClick={this.handleSubmit}>Submit</button>
            </form>
        )
    }

}

export default Login;