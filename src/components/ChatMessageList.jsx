import React, { Component } from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Avatar from './Avatar.jsx';
import ChatMessageItem from './ChatMessageItem.jsx';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  messagesWrapper: {
    overflowX: 'scroll',
    height: '100%',
    width: '100%',
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: '120px',
  },
  paper: {
    padding: theme.spacing.unit * 3
  }
});

class ChatMessageList extends Component {
  render() {
    const { classes, match, messages, activeUser } = this.props;

    if (!match.params.chatId) {
      return (
        <Paper className={classes.paper}>
          <Typography variant="display1" gutterBottom>
            Start messaging…
          </Typography>
          <Typography variant="body1" gutterBottom>
            Use <strong>Global</strong> to explore communities around here.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Use <strong>Recents</strong> to see your recent conversations.
          </Typography>
        </Paper>
      )
    }

    return messages && messages.length ? (
      <div className={classes.messagesWrapper}>
        {messages && messages.map((message, index) => (
          <ChatMessageItem
            key={index}
            activeUser={activeUser}
            {...message}
          />
        ))}
      </div>
    ) : (
      <Typography variant="display1">
        There is no messages yet...
      </Typography>
    )
  }
}

export default withRouter(withStyles(styles)(ChatMessageList));
