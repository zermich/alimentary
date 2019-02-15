import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import localforage from 'localforage';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

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

        componentWillMount() {
            localforage.getItem('token')
                .then( result => {
                    const headers = {
                    'Content-Type': 'application/json',
                    'x-access-token': result
                    }
                    axios.post(`http://localhost:4200/user/checkAuth`, null , {headers: headers})
                    .then( res => {
                    this.setState({
                        token: res.data.allowAccess
                    });
                    this.checkAuth(this.state.token, result);
                    })
                    .catch ( err => {
                    console.log(err);
                    });  
                });
        }

        checkAuth(token, result) {
            if(!token) {
                this.setState({redirect: true});
            } else {
                this.setState({redirect: false, userValue: (jwtDecode(result)).email});
            }
        }

        render() {
            if(this.state.redirect) {
                return (<Redirect to="/login"/>);
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