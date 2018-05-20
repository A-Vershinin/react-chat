import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import ChatList from './ChatList.jsx';

import InputMessage from './InputMessage.jsx';

const styles = theme => ({
  chatLayout: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    overflow: 'hidden',
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
        <ChatList messages={messages} />
        <InputMessage />
      </main>
    );
  }
}

export default withStyles(styles)(Chat);
