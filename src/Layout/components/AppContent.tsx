import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginScreen from '../../Login/components/LoginScreen';
import ChatScreen from '../../Chat/components/ChatScreen';
import ProfileScreen from '../../Users/components/ProfileScreen';
import HomeScreen from './HomeScreen';
import { ErrorScreen } from './ErrorScreen';
import UsersList from '../../Users/components/UsersList';

class AppContent extends React.Component {
  render(){
    return (
      <Switch>
        <Route path="/login" component={LoginScreen} />
        <Route path="/users" component={UsersList} />
        <Route path="/profile" component={ProfileScreen} />
        <Route path="/conversations/:id" component={ChatScreen} />
        <Route exact path="/" component={HomeScreen}/>
        <Route><ErrorScreen errorMessage='Oops ! It seems like we did not find this page!'/></Route>
      </Switch>
    )
  }
}

export default AppContent;