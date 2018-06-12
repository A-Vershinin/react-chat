import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText'
// import Avatar from 'material-ui/Avatar';
import Avatar from './Avatar.jsx';

const styles = theme => ({
  activeItem: {
    backgroundColor: theme.palette.grey[200],
  }
});

const ChatItem = ({ classes, title, chatId, active, disabled }) => {

  return (
    <ListItem
      button
      component={Link}
      to={`/chat/${chatId}`}
      className={active ? classes.activeItem : ''}
      disabled={disabled}
    >
      <Avatar colorFrom={title}>{title}</Avatar>
      <ListItemText primary={title}/>
    </ListItem>
  );
}

export default withStyles(styles)(ChatItem);
