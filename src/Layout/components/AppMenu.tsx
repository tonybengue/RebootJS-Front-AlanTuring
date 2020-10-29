import React from 'react';
import { AppBar, Toolbar, Typography, Grid } from '@material-ui/core';
import { Forum } from '@material-ui/icons';
import { ContactListButton } from './ContactListButton';
import { DrawerContentString } from '../types';
import ConversationsButton from './ConversationsButton';
import { connect } from 'react-redux';

import ProfileButton from './ProfileButton';

interface AppMenuProps {
  toggleDrawer: (content: DrawerContentString) => void,
  firstName?: string
}

// function AppMenu({ toggleDrawer, firstName }: {toggleDrawer: (content: DrawerContentString) => void}){
function AppMenu({ toggleDrawer, firstName }: AppMenuProps){
  return (
      // <AppBar position="static">
      //   <Toolbar>
      //     <IconButton edge="start" color="inherit" aria-label="menu">
      //       <AccountCircleIcon />
      //     </IconButton>
      //     <Typography variant="h6">
      //       Flint Messenger
      //     </Typography>
      //     <Button component={ Link } to="/login" color="inherit">Login</Button>
      //     <Button component={ Link } to="/users" color="inherit">Users</Button>
      //   </Toolbar>
      // </AppBar>
      <AppBar position="static" style={{ height: '10vh' }}>
        <Grid container justify="space-between" alignItems="center" style={{ height: '100%' }}>
          <Grid item>
            <Toolbar>
              <Forum fontSize="large" />
              <Typography variant="h3"> Enigma.</Typography>
            </Toolbar>
          </Grid>
            <Grid item>
              <Typography>{ firstName }</Typography>
            </Grid>
          <Grid item>
            <Toolbar>
              <ConversationsButton toggleDrawer={toggleDrawer}/>
              <ContactListButton toggleDrawer={toggleDrawer}/>
              <ProfileButton />
            </Toolbar>
          </Grid>
        </Grid>
      </AppBar>
    )
}

const mapStateToProps = (state :any) => ({
  firstName: state.users.connectedUser?.firstName
})

// export default AppMenu;
export default connect(mapStateToProps)(AppMenu);