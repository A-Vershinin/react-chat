import React from 'react';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';

import ChatMessageItem from './ChatMessageItem.jsx';
import titleInitials from '../utils/title-initials';

const styles = theme => ({
  messagesWrapper: {
    overflowX: 'scroll',
    height: '100%',
    width: '100%',
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: '120px',
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

const ChatMessageList = props => {

  const {
    classes,
    messages
  } = props;

  return (
    <div className={classes.messagesWrapper}>
    {
      messages && messages.map((message, index) => {
      const isMessageFromMe = message.sender === 'me';

        const userAvatar = (
          <Avatar> {titleInitials(message.sender[0])} </Avatar>
        );

        return (
          <div key={index} className={classNames(classes.messageWrapper,
            isMessageFromMe && classes.messageWrappperFromMe)}>
            <ChatMessageItem
              isMessageFromMe={isMessageFromMe}
              userAvatar={userAvatar}
              message={message}
            />
        </div>
        );
      })
    }
    </div>
  );
}

export default withStyles(styles)(ChatMessageList);
