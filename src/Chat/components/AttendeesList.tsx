import React from 'react';
import { List } from '@material-ui/core';
import UserDetails from '../../Users/components/UserDetails'

export function AttendeesList({users} : {users: string[]}){
  return <List>
       {/* Pour utiliser UsersListItem il faudrait avoir accès à la liste des users et récupéere, celui correspondant aux id de la liste reçue en props. 
        {users.map((user, index) => <UsersListItem key={index} user={user} />)} */}
        {/* {users.map((user,index) => <ListItem key={index}>{user}</ListItem>)} */}
        {users.map((userId,index) => <UserDetails key={index} id={userId} />)}
      </List>
} 