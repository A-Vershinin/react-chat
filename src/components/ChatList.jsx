import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ChatItem from './ChatItem';

const styles = theme => ({
  chatsList: {
    height: 'calc(100% - 56px)',
    overflowY: 'scroll',
  },
});

const ChatList = ({ classes, chats }) => {
  return (
      <List className={classes.chatsList}>
        {chats && chats.map((chat, index) => (
            <ChatItem key ={index} {...chat} />
        ))}
      </List>
  );
}

export default withStyles(styles)(ChatList);
