import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
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

ChatHeader.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  activeUser: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string,
    isMember: PropTypes.bool.isRequired,
    isCreator: PropTypes.bool.isRequired,
    isChatMember: PropTypes.bool.isRequired,
  }).isRequired,
  activeChat: PropTypes.shape({
    createdAt: PropTypes.string.isRequired,
    creator: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
    }).isRequired,
    members: PropTypes.arrayOf(PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
    })).isRequired,
    title: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }),
  logout: PropTypes.func.isRequired,
  deleteChat: PropTypes.func.isRequired,
  leaveChat: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired,
  isConnected: PropTypes.bool.isRequired,
};

ChatHeader.defaultProps = {
  activeChat: null,
};

export default withStyles(styles)(ChatHeader);
