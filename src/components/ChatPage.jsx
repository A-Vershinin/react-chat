import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Sidebar from './Sidebar.jsx';
import ChatHeader from './ChatHeader.jsx';
import ChatMessages from './ChatMessages.jsx';

import { messages } from '../mock-data.json';

const styles = theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.default,
  },
});

class ChatPage extends Component {

  componentDidMount() {
    const { match, fetchAllChats, fetchMyChats, setActiveChat } = this.props;

    Promise.all([fetchAllChats(), fetchMyChats()])
      .then(() => {
        if (match.params.chatId) {
          setActiveChat(match.params.chatId);
        }
    });
  }

  componentWillReceiveProps(nextProps) {
    const { match: { params }, setActiveChat } = this.props;
    const { params: nextParams } = nextProps.match;

    // If we change route, then fetch messages from chat by chatID
    if (nextParams.chatId && params.chatId !== nextParams.chatId) {
      setActiveChat(nextParams.chatId);
    }
  }

  render() {
    const { chats, classes, logout, disabled = false, createChat, deleteChat, joinChat, leaveChat, editUser, activeUser } = this.props;

    return (
      <div className={classes.root}>
        <ChatHeader
          activeUser={activeUser}
          logout={logout}
          disabled={disabled}
          activeChat={chats.active}
          deleteChat={deleteChat}
          leaveChat={leaveChat}
          editUser={editUser}
        />
        <Sidebar
          chats={chats}
          disabled={disabled}
          createChat={createChat}
        />
        <ChatMessages
          messages={messages}
          activeUser={activeUser}
          activeChat={chats.active}
          joinChat={joinChat}
        />
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(ChatPage));
