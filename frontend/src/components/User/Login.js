import React, { Component } from 'react';
import UserService from '../../Service/UserService';

import AddItem from '../AddItem';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userValue: "",
            passwordValue: "",
            loggedIn: false
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

    // Switched other input functions to this one to avoid repetition
      handleChange(event) {
          this.setState({[event.target.name]: event.target.value});
      }
    
      handleSubmit(event) {
        event.preventDefault();
        const user = { userValue: this.state.userValue, passwordValue: this.state.passwordValue};
        this.addUserService.sendLoginData(user, ()=> {this.setState({ loggedIn: true })});
      }

    render() {
        if(this.state.loggedIn) {
            return ( <AddItem user={this.state.userValue} /> );
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
                        <input type="text" name="password" value={this.state.passwordValue} onChange={ e => this.handlePasswordInput(e) } />
                    </label><br/>
                    <button type="submit" onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>
        )
    }

}

export default Login;