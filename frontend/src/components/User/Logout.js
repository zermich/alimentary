import React, { Component } from 'react';
import localforage from 'localforage';

class Logout extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    // Removes token from local storage logging user out
    handleSubmit(e) {
        e.preventDefault();

        localforage.removeItem('token').then(function() {
            // Run this code once the key has been removed.
            console.log('Key is cleared!');
        }).catch(function(err) {
            // This code runs if there were any errors
            console.log(err);
        });
    }

    render() {
        return (
            <div>
                <button type="submit" onClick={this.handleSubmit}>Logout</button>
            </div>
        )
    }

}

export default Logout;