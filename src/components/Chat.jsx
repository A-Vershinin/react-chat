import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Paper from '@material-ui/core/Paper';
import Avatar from 'material-ui/Avatar';
import ChatItem from './ChatItem.jsx';

import InputMessage from './InputMessage.jsx';
import titleInitials from '../utils/title-initials';

const styles = theme => ({
  chatLayout: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    overflow: 'hidden',
  },
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

class Chat extends Component {
  constructor(props){
    super(props);
    this.refMessagesWrapper = React.createRef();
  }

  componentDidMount() {
    this.scrollDownHistory();
  }

  componentDidUpdate() {
    this.scrollDownHistory();
  }

  scrollDownHistory() {
    const messagesWrapper = this.refMessagesWrapper.current;

    if (messagesWrapper) {
      messagesWrapper.scrollTop = messagesWrapper.scrollHeight;
    }
  }

  render() {
    const { classes, messages } = this.props;

    return (
      <main className={classes.chatLayout} ref={this.refMessagesWrapper}>
        <div className={classes.messagesWrapper}>
          {messages && messages.map((message, index) => {
            const isMessageFromMe = message.sender === 'me';

            const userAvatar = (
              <Avatar> {titleInitials(message.sender[0])} </Avatar>
            );

            return (
             <div key={index}
              className={classNames(classes.messageWrapper,
              isMessageFromMe && classes.messageWrappperFromMe)}>
                <ChatItem
                  isMessageFromMe={isMessageFromMe}
                  userAvatar={userAvatar}
                   message={message}
                />
            </div>
            );
          })}
        </div>
        <InputMessage />
      </main>
    );
  }
}

export default withStyles(styles)(Chat);
