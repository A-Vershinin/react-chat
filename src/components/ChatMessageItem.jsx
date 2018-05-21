import React, { Fragment } from 'react';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Paper from '@material-ui/core/Paper';

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
});

const ChatMessageItem = props => {
  const {
    classes,
    message,
    isMessageFromMe,
    userAvatar
  } = props;

  return (
    <Fragment>
      {!isMessageFromMe && userAvatar}
      <Paper className={classNames(classes.message, isMessageFromMe && classes.messageFromMe)}>
        <Typography variant="caption">
          {message.sender}
        </Typography>
        <Typography variant="body1">
          {message.content}
        </Typography>
      </Paper>
      {isMessageFromMe && userAvatar}
    </Fragment>
  )
}

export default withStyles(styles)(ChatMessageItem);
