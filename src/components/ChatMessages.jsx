import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import ChatMessageList from './ChatMessageList.jsx';

import InputMessage from './InputMessage.jsx';

const styles = theme => ({
  chatLayout: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
  },
});

class ChatMessages extends Component {
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
    const { classes, messages, activeChat, joinChat, activeUser, sendMessage, isConnected  } = this.props;

    return (
      <main className={classes.chatLayout} ref={this.refMessagesWrapper}>
        <ChatMessageList
          messages={messages}
          activeUser={activeUser}
        />
        {activeChat && <InputMessage
          onSendMessage={sendMessage}
          disabled={!isConnected}
          showJoinButton={!activeUser.isChatMember}
          onJoinButtonClick={() => joinChat(activeChat._id)}
          activeUser={activeUser}
        />}
      </main>
    );
  }
}

export default withRouter(withStyles(styles)(ChatMessages));
