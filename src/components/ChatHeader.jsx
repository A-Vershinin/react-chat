import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import UserMenu from './UserMenu.jsx';
import ChatMenu from './ChatMenu.jsx';
import Avatar from './Avatar.jsx';

const styles = theme => ({
  appBar: {
    position: 'fixed',
    width: `calc(100% - 320px)`,
    flexGrow: 1,
    marginLeft: 320,
  },
  appBarTitle: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    color: theme.palette.secondary.contrastText,
  },
});

class ChatHeader extends Component {

  render() {
    const { classes, logout, disabled, activeUser = {}, activeChat, deleteChat, leaveChat, editUser } = this.props;
    // console.log("leaveChat", leaveChat())
    return (
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar color="contrast">
          {activeChat ? (
            <Fragment>
              <Avatar colorFrom={activeChat._id}>
                {activeChat.title}
              </Avatar>
              <Typography variant="title" className={classes.appBarTitle}>
                {activeChat.title}
                <ChatMenu
                  disabled={disabled}
                  activeUser={activeUser}
                  onDeleteChat={() => deleteChat(activeChat._id)}
                  onLeaveChat={() => leaveChat(activeChat._id)}
                />
              </Typography>
            </Fragment>
          ) : (
            <Typography variant="title" color="inherit" noWrap className={classes.appBarTitle}>
              DogeCodes React Chat
            </Typography>
          )}
          <UserMenu
            disabled={disabled}
            activeUser={activeUser}
            onLogoutClick={logout}
            onEditProfileClick={editUser}
          />
        </Toolbar>
      </AppBar>
    );
  }
}


export default withStyles(styles)(ChatHeader);
