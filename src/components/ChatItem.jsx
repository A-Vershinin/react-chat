import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from 'material-ui/Avatar';

import titleInitials from '../utils/title-initials'

const ChatItem = ({ chat }) => {
  return (
    <ListItem button>
      <Avatar>{titleInitials(chat.title)}</Avatar>
      <ListItemText primary={chat.title}/>
    </ListItem>
  );
}

export default ChatItem;
