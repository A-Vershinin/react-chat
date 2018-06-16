import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ChatMessageItem from './ChatMessageItem.jsx';

/* eslint-disable */
const styles = theme => ({
  messagesWrapper: {
    overflowX: 'scroll',
    height: '100%',
    width: '100%',
    paddingTop: theme.spacing.unit * 8,
    paddingBottom: '120px',
  },
  paper: {
    padding: theme.spacing.unit * 3,
  },
});

const ChatMessageList = ({ classes, match, messages, activeUser }) => {
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
    );
  }

  return messages && messages.length ? (
    <div className={classes.messagesWrapper}>
      {messages &&
        messages.map((message, index) => {
          return <ChatMessageItem key={message._id} activeUser={activeUser} {...message} />;
        })}
    </div>
  ) : (
    <Typography variant="display1">There is no messages yet...</Typography>
  );
};

ChatMessageList.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }).isRequired,
  activeUser: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string,
    isMember: PropTypes.bool.isRequired,
    isCreator: PropTypes.bool.isRequired,
    isChatMember: PropTypes.bool.isRequired,
  }).isRequired,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      chatId: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      sender: PropTypes.object.isRequired,
      createdAt: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default withRouter(withStyles(styles)(ChatMessageList));
