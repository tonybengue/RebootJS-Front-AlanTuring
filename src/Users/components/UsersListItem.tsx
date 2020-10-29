import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { IUser } from '../types';
import UserDetails from './UserDetails';
import history from '../../history';
import { IConversation } from '../../Chat/types';
import { updateConversation } from '../../Chat/actions/updateConversation';
import { connect } from 'react-redux';

interface UsersListItemProps{
  user: IUser;
  connectedUser?: IUser;
  updateConversation: (conversation: IConversation) => void;
}

class UsersListItem extends Component<UsersListItemProps> {
  createConversation = (user: IUser) => {
    const { connectedUser } = this.props;
    if(!connectedUser) { return }

    // crée une conversation dans la liste des conversations
    const conversation : IConversation = {
      _id: generateConversationId(connectedUser._id, user._id),
      messages: [],
      targets: [user._id, connectedUser._id],
      updatedAt: new Date(),
      unseenMessages: 0
    };
    // on l'ajoute a la liste en dispatchant la bonne action
    this.props.updateConversation(conversation);

    history.push(`/conversations/${conversation._id}`);
  }

  render(){
    const user = this.props.user;
    return (
      // <ListItem>
      //   <ListItemAvatar>
      //     <Avatar>
      //       {user.firstName[0]}{user.lastName[0]}
      //     </Avatar>
      //   </ListItemAvatar>
      //   <ListItemText
      //     primary={`${user.firstName} ${user.lastName}`}
      //   />
      // </ListItem>

      // <UserDetails id={ user._id } />
      <Button onClick={(_e) => this.createConversation(user)}>
        <UserDetails id={user._id} />
      </Button>
    )
  }
}

function generateConversationId(connectedUserId: string, targetId: string){
  return btoa(`${connectedUserId}_${targetId}_${new Date().toISOString()}`);
}

// export default UsersListItem;
const mapDispatchToProps = (dispatch: any) => ({
  updateConversation: (conversation: IConversation) => dispatch(updateConversation(conversation))
});

export default connect(undefined, mapDispatchToProps)(UsersListItem); 