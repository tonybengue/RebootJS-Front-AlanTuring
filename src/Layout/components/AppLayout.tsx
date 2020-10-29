import React, { Component, Fragment } from 'react';
import { createStyles, Theme, withStyles } from '@material-ui/core';
import AppContent from './AppContent';
import AppDrawer, { drawerWidth } from './AppDrawer';
import AppMenu from './AppMenu';
import { DrawerContentString } from '../types';

interface IAppLayoutState {
  drawerOpened: boolean;
  drawerContent?: DrawerContentString;
}

interface IAppLayoutProps {
  classes: any;
  // Redux for api calls
//   getConnectedUser: () => void;
//   getUsers: () => void;
//   getConversations: () => void;
}

const style = (theme: Theme) => createStyles({
  content: {
    width: `100%`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
});

class AppLayout extends Component<IAppLayoutProps, IAppLayoutState> {
  constructor(props: IAppLayoutProps){
    super(props);
    this.state = {
      drawerOpened: false
    }
  }

   // Call to redux action
  // componentDidMount(){
  //   this.props.getConnectedUser();
  //   this.props.getUsers();
  //   this.props.getConversations();

  //   // Pooling
  //   this.setState({
  //     timer: setInterval(() => { this.props.getConversations() }, 3000)
  //   })
  // }

  // componentWillUnmount() {
  //   // Delete the timer
  //   if(this.state.timer) { clearInterval(this.state.timer) };
  // }

  // Close left menu
  closeDrawer = () => {
    this.setState({
      drawerOpened: false
    })
  }
  
  // Open left menu
  toggleDrawer = (content: DrawerContentString) => {
    this.setState({
      drawerOpened: !this.state.drawerOpened,
      drawerContent: !this.state.drawerOpened ? content : undefined
    })
  }

  render(){
    const contentClasses = [
      this.props.classes.content,
      this.state.drawerOpened && this.props.classes.contentShift
    ].join(" ");
    
    return (
      <Fragment>
        <div className={contentClasses}>
          <AppMenu toggleDrawer={this.toggleDrawer}/>
          <AppContent />
        </div>
        <AppDrawer
          open={this.state.drawerOpened}
          closeDrawer={this.closeDrawer}
          content={this.state.drawerContent}
        />
      </Fragment>
    )
  }
}

// export default withStyles(style)(AppLayout);
// Redux
// const mapDispatchToProps = (dispatch: any) => ({
//   getConnectedUser: () => { dispatch(makeFetchConnectedUser()) },
//   getUsers: () => { dispatch(makeFetchUsersList()) },
//   getConversations: () => { dispatch(makeFetchConversations()) }
// })

// export default connect(undefined, mapDispatchToProps)(withStyles(style)(AppLayout));
export default withStyles(style)(AppLayout); 