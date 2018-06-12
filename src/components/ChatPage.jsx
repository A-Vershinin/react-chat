import React, { Component } from 'react';
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
    const { fetchAllChats, fetchMyChats } = this.props;

    Promise.all([
      fetchAllChats(),
      fetchMyChats()
    ]);
  }

  render() {
    const { chats, classes, logout, createChat } = this.props;

    return (
      <div className={classes.root}>
        <ChatHeader
          logout={logout}
        />
        <Sidebar
          chats={chats.all}
          createChat={createChat}
        />
        <ChatMessages messages={messages}/>
      </div>
    );
  }
}

export default withStyles(styles)(ChatPage);
