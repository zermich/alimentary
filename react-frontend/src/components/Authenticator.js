import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import localforage from 'localforage';
import axios from 'axios';
import AddItem from './AddItem';

export default function requireAuthentication(Component) {
    class Authenticator extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                redirect: false,
                token: false
            }
        }

        componentWillMount() {
            localforage.getItem('token')
                .then( result => {
                    const headers = {
                    'Content-Type': 'application/json',
                    'x-access-token': result
                    }
                    axios.post(`/user/checkAuth`, null , {headers: headers})
                    .then( res => {
                    this.setState({
                        token: res.data.allowAccess
                    });
                    this.checkAuth(this.state.token);
                    })
                    .catch ( err => {
                    console.log(err);
                    });  
                });
        }

        checkAuth(token) {
            if(!token) {
                this.setState({redirect: true});
            } else {
                this.setState({redirect: false});
            }
        }

        render() {
            if(this.state.redirect) {
                return (<Redirect to="/login"/>);
            }
            return (
                <div>
                    {this.state.token || true ?
                    <AddItem {...this.props}/> : 'YOU SHALL NOT PASS'
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