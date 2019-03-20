import React, { Component } from 'react';

import Login from './Login';
import requireAuthentication from '../Authenticator';
import AddItem from '../AddItem';

const ItemAction = requireAuthentication(AddItem);

class UserContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        };
      }


    render() {
        return (
            <div>
                <ItemAction />
            </div>
        )
    }

}

export default UserContainer;