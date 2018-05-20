import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Sidebar from './components/Sidebar.jsx';
import ChatHeader from './components/ChatHeader.jsx';
import Chat from './components/Chat.jsx';

import { chats, messages } from './mock-data.json';

const styles = theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.default,
  },
});

class Layout extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <ChatHeader />
        <Sidebar chats={chats}/>
        <Chat messages={messages}/>
      </div>
    );
  }
}

export default withStyles(styles)(Layout);
