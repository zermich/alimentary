import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import localforage from 'localforage';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

// import Login from './User/Login';

export default function requireAuthentication(Component) {
    class Authenticator extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                redirect: false,
                token: false,
                userValue: ""
            }
        }

        // Checks local storage for token, checks with api if token is valid, sets state token to true if located, passes state token boolean and axios result to checkAuth()
        componentWillMount() {
            localforage.getItem('token')
                .then( result => {
                    const headers = {
                    'Content-Type': 'application/json',
                    'x-access-token': result
                    }
                    axios.post(`https://www.alimentary.cc/alimentary-api/user/checkAuth`, null , {headers: headers})
                    .then( res => {
                        this.setState({
                            token: res.data.allowAccess
                        });
                        this.checkAuth(this.state.token, result);
                    })
                    .catch ( err => {
                    console.error(err);
                    });  
                });
        }

        // Checks if token boolean is true. If this.state.token is false, sets state redirect to true. If this.state.token is true, decodes token to retrieve user and set as this.state.userValue
        checkAuth(token, result) {
            if(!token) {
                this.setState({redirect: true});
            } else {
                this.setState({redirect: false, userValue: (jwtDecode(result)).user});
            }
        }

        render() {
            if(this.state.redirect) {
                return (<Redirect to="/login"/>);
                // return (<Login />);
            }
            return (
                <div>
                    {this.state.token || true ?
                    <Component {...this.props} user={this.state.userValue} /> : 'YOU SHALL NOT PASS'
                    }
                </div>
            )
        }
    }

    Authenticator.propTypes = {
        token: PropTypes.string
    }

    return Authenticator;
}