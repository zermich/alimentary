import React, { Component } from 'react';

import requireAuthentication from '../Authenticator';
import AddItem from '../AddItem';

const ItemAction = requireAuthentication(AddItem);

class UserContainer extends Component {

    render() {
        return (
            <div>
                <ItemAction />
            </div>
        )
    }

}

export default UserContainer;