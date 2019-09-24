import React, { Component } from 'react';
import UserService from '../../Service/UserService';
import { Redirect } from 'react-router-dom';


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userValue: "",
            passwordValue: "",
            loggedIn: false,
            redirect: false
        };
        this.addUserService = new UserService();
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      // Sets this.state.userValue with input data
      handleUserInput(event) {
        this.setState({
            userValue: event.target.value
        })
      }

      // Sets this.state.passwordValue with input data
      handlePasswordInput(event) {
        this.setState({
            passwordValue: event.target.value
        })
      }

    // Switched other input functions to this one to avoid repetition
      handleChange(event) {
          this.setState({[event.target.name]: event.target.value});
      }
    
      // Sends state data to api to validate login info
      handleSubmit(event) {
          console.log('login submit clicked');
        event.preventDefault();
        const user = { userValue: this.state.userValue, passwordValue: this.state.passwordValue};
        this.addUserService.sendLoginData(user, res => {
            this.setState({
                redirect: true
            })
        });
      }

    render() {

        if(this.state.redirect) {
            return (<Redirect to="/add-item"/>);
        }

        return (
            <div>
                <p>Log in to add item.</p>
                <form>
                    <label>
                        Username:
                        <input type="text" name="user" value={this.state.userValue} onChange={ e => this.handleUserInput(e) } />
                    </label><br/>
                    <label>
                        Password:
                        <input type="password" name="password" value={this.state.passwordValue} onChange={ e => this.handlePasswordInput(e) } />
                    </label><br/>
                    <button type="submit" onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>
        )
    }

}

export default Login;