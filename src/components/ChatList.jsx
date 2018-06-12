import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ChatItem from './ChatItem.jsx';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  chatsList: {
    height: 'calc(100% - 56px)',
    overflowY: 'scroll',
  },
  noChats: {
    textAlign: 'center',
  },
});

const ChatList = ({ classes, chats, activeChat, disabled }) => {
  return (
      <List className={classes.chatsList}>
        {chats && chats.length ? (
          chats.map(chat => (
            <ChatItem
              key={chat._id}
              disabled={disabled}
              active={activeChat && activeChat._id === chat._id}
              chatId={chat._id}
              {...chat} />
          ))
        ) : (
          <Typography variant="subheading" className={classes.noChats}>
            There is no chats yet...
          </Typography>
        )}
      </List>
  );
}

export default withStyles(styles)(ChatList);
