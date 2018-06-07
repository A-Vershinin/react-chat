import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText'
// import Avatar from 'material-ui/Avatar';
import Avatar from './Avatar.jsx';


const ChatItem = ({ title  }) => {
  return (
    <ListItem button>
      <Avatar colorFrom={title}>{title}</Avatar>
      <ListItemText primary={title}/>
    </ListItem>
  );
}

export default ChatItem;
