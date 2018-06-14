import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Sidebar from './Sidebar.jsx';
import ChatHeader from './ChatHeader.jsx';
import ChatMessages from './ChatMessages.jsx';
import ErrorMessage from './ErrorMessage.jsx';

// import { messages } from '../mock-data.json';

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
    const {
      match, fetchAllChats, fetchMyChats, setActiveChat, socketsConnect, mountChat,
    } = this.props;

    Promise.all([fetchAllChats(), fetchMyChats()])
      .then(() => {
        socketsConnect();
      })
      .then(() => {
        const { chatId } = match.params;

        if (chatId) {
          setActiveChat(chatId);
          mountChat(chatId);
        }
      });
  }

  componentWillReceiveProps(nextProps) {
    const {
      match: { params },
      setActiveChat,
      unmountChat,
      mountChat,
    } = this.props;
    const { params: nextParams } = nextProps.match;

    // If we change route, then fetch messages from chat by chatID
    if (nextParams.chatId && params.chatId !== nextParams.chatId) {
      setActiveChat(nextParams.chatId);
      unmountChat(params.chatId);
      mountChat(nextParams.chatId);
    }
  }

  render() {
    const {
      classes,
      chats,
      logout,
      isConnected,
      createChat,
      deleteChat,
      joinChat,
      leaveChat,
      editUser,
      activeUser,
      messages,
      sendMessage,
      error,
    } = this.props;

    return (
      <div className={classes.root}>
        <ChatHeader
          activeUser={activeUser}
          logout={logout}
          isConnected={isConnected}
          activeChat={chats.active}
          deleteChat={deleteChat}
          leaveChat={leaveChat}
          editUser={editUser}
        />
        <Sidebar chats={chats} isConnected={isConnected} createChat={createChat} />
        <ChatMessages
          messages={messages}
          sendMessage={sendMessage}
          activeUser={activeUser}
          activeChat={chats.active}
          joinChat={joinChat}
          isConnected={isConnected}
        />
        <ErrorMessage error={error} />
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(ChatPage));
