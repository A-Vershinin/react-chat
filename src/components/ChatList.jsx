import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ChatItem from './ChatItem.jsx';

const styles = theme => ({
  chatsList: {
    height: 'calc(100% - 56px)',
    overflowY: 'scroll',
  },
});

const ChatList = ({ classes, chats, activeChat }) => {

  return (
      <List className={classes.chatsList}>
        {chats && chats.map((chat, index) => {
          return (
            <ChatItem
              key ={index}
              active={activeChat && activeChat._id === chat._id}
              chatId={chat._id}
              {...chat} />
          )
        }
      )}
      </List>
  );
}

export default withStyles(styles)(ChatList);
