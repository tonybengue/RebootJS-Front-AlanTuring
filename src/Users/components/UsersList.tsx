import React, { Component } from 'react';
import { List } from '@material-ui/core';
import { IUser } from '../types';
import UsersListItem from './UsersListItem';

import { IAppState } from '../../appReducer';
import { connect } from 'react-redux';

interface IUserListState {
    users: IUser[];
    connectedUser?: IUser;
}

// The UserList
// class UsersList extends Component<{}, IUserListState> {
    // constructor(props: {}) {
    //     super(props);

    //     this.state = {
    //         users: []
    //     }
    // }

    // Call automatically after the component is mounted
    // componentDidMount() {
    //   //GetUsers() car promise
    //   getUsers()
    //     .then(users => {
    //       this.setState({ users: users })
    //     })
    // }
class UsersList extends Component<IUserListState> {
    render() {
        // return <h1>Liste d'utilisateurs</h1>
        // Display loading
        if(this.props.users.length === 0){
            return <h1>Loading</h1>
        } else {
            return <List>
                {/* {this.props.users.map((user, index) => <UsersListItem key={index} user={user} />)} */}
                {this.props.users.map((user, index) => 
                    <UsersListItem
                      key={index}
                      user={user}
                      connectedUser={this.props.connectedUser}
                    />
                )}
            </List>
        }
    }
}

// export default UsersList;
const mapStateToProps = ({users} : IAppState) => ({
    users: users.list,
    connectedUser: users.connectedUser
  })
  export default connect(mapStateToProps)(UsersList);