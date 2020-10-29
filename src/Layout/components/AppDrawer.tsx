import React from 'react';
import { makeStyles, Theme, createStyles, Drawer, Divider, IconButton } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import UsersList from '../../Users/components/UsersList';
import { Alert } from './Alert';
import { DrawerContentString } from '../types';
import ConversationsList from '../../Chat/components/ConversationsList';

interface DrawerProps {
  open: boolean,
  closeDrawer: () => void;
  content?: DrawerContentString;
}

export const drawerWidth = 'calc(100% - 75%)';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerHeader: {
      heigth: '70px',
      textAlign: 'right',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: theme.palette.background.paper,
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    paper: {
      width: drawerWidth,
    },
    drawerContent: {
      height: 'calc(100% - 50px)',
    },
    items: {
      "&:hover": {
        border: "1px solid #6c757d",
        color: "black"
      },
      textAlign: "center",
      "&:focus": {
        background: "#6c757d",
        color: "black"
      }
    }
  })
)

function AppDrawer({ open, closeDrawer, content }: DrawerProps){
  const classes = useStyles();
  let contentComponent: any;

  // App drawer choice
  if(content === "users"){
    contentComponent = <UsersList />
  } else if (content === "conversations") {
    contentComponent = <ConversationsList />
  } else {
    contentComponent = <Alert status='error' error="Drawer content invalid"/>
  }

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      onClose={closeDrawer}
      classes={{
        paper: classes.paper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={closeDrawer}>
          <ChevronLeft />
        </IconButton>
      </div>
      <Divider />
      {/* {content === "users" ? <UsersList /> : <Alert status='error' error="Drawer content invalid"/>} */}
        {contentComponent}
    </Drawer>
  )
}

export default AppDrawer;