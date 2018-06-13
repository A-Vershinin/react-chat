import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Avatar from './Avatar.jsx';
import senderName from '../utils/sender-name';
import randomColor from '../utils/color-from';

const styles = theme => ({
  message: {
    maxWidth: '70%',
    minWidth: '10%',
    padding: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 2,
  },
  messageFromMe: {
    marginRight: theme.spacing.unit * 2,
    backgroundColor: '#e6dcff'
  },
  messageWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 3}px`,
  },
  messageWrappperFromMe: {
    justifyContent: 'flex-end',
  },
});

const ChatMessageItem = props => {
  const { classes, activeUser, sender, content } = props;

  const displayedName = senderName(sender);
  const isMessageFromMe = sender._id === activeUser._id;

  const userAvatar = (
    <Avatar colorFrom={sender._id}>
      {sender.username}
    </Avatar>
  );

  return (
    <div className={classNames(classes.messageWrapper, isMessageFromMe && classes.messageWrappperFromMe)}>
      {!isMessageFromMe && userAvatar}

      <Paper className={classNames(classes.message, isMessageFromMe && classes.messageFromMe)}>
        <Typography variant="caption" style={{ color: randomColor(sender._id)}}>
          {displayedName}
        </Typography>
        <Typography variant="body1">
          {content}
        </Typography>
      </Paper>

      {isMessageFromMe && userAvatar}
    </div>
  )
}

export default withStyles(styles)(ChatMessageItem);
