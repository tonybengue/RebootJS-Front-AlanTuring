import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { IConversation } from '../types';

export function ConversationsListItem({conversation} : {conversation: IConversation}){
  return (
    <ListItem
      divider
      button
      component={Link}
      to={`/conversations/${conversation._id}`}
      key={conversation._id}>
        <ListItemText
          primary={conversation._id}
          secondary={conversation.messages[0].content}
        />
    </ListItem>
  )
}