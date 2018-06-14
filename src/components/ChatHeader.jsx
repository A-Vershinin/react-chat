import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import UserMenu from './UserMenu.jsx';
import ChatMenu from './ChatMenu.jsx';
import Avatar from './Avatar.jsx';

/* eslint no-underscore-dangle: 0 */
const styles = theme => ({
  appBar: {
    position: 'fixed',
    width: 'calc(100% - 320px)',
    flexGrow: 1,
    marginLeft: 320,
  },
  appBarTitle: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    color: theme.palette.secondary.contrastText,
  },
});

const ChatHeader = ({
  classes, logout, activeUser, activeChat, deleteChat, leaveChat, editUser, isConnected,
}) => (
  <AppBar position="absolute" className={classes.appBar}>
    <Toolbar color="contrast">
      {activeChat ? (
        <Fragment>
          <Avatar colorFrom={activeChat.title}>{activeChat.title}</Avatar>
          <Typography variant="title" className={classes.appBarTitle}>
            {activeChat.title}
            <ChatMenu
              disabled={!isConnected}
              activeUser={activeUser}
              onDeleteChat={() => deleteChat(activeChat._id)}
              onLeaveChat={() => leaveChat(activeChat._id)}
            />
          </Typography>
        </Fragment>
      ) : (
        <Typography variant="title" color="inherit" noWrap className={classes.appBarTitle}>
          React Chat
        </Typography>
      )}
      <UserMenu disabled={!isConnected} activeUser={activeUser} onLogoutClick={logout} onEditProfileClick={editUser} />
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(ChatHeader);
