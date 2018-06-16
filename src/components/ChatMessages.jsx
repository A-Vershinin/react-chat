import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import ChatMessageList from './ChatMessageList.jsx';
import InputMessage from './InputMessage.jsx';

/* eslint no-underscore-dangle: 0 */
const styles = () => ({
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
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    messages: PropTypes.arrayOf(PropTypes.shape({
      chatId: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      sender: PropTypes.object.isRequired,
      createdAt: PropTypes.string.isRequired,
    })).isRequired,
    activeChat: PropTypes.shape({
      createdAt: PropTypes.string.isRequired,
      creator: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
      }).isRequired,
      members: PropTypes.arrayOf(PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
      })).isRequired,
      title: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
    }),
    activeUser: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      username: PropTypes.string,
      isMember: PropTypes.bool.isRequired,
      isCreator: PropTypes.bool.isRequired,
      isChatMember: PropTypes.bool.isRequired,
    }).isRequired,
    joinChat: PropTypes.func.isRequired,
    sendMessage: PropTypes.func.isRequired,
    isConnected: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    activeChat: null,
  };

  constructor(props) {
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
    const {
      classes, messages, activeChat, joinChat, activeUser, sendMessage, isConnected,
    } = this.props;

    return (
      <main className={classes.chatLayout} ref={this.refMessagesWrapper}>
        <ChatMessageList messages={messages} activeUser={activeUser} />
        {activeChat && (
          <InputMessage
            onSendMessage={sendMessage}
            disabled={!isConnected}
            showJoinButton={!activeUser.isChatMember}
            onJoinButtonClick={() => joinChat(activeChat._id)}
            activeUser={activeUser}
          />
        )}
      </main>
    );
  }
}

export default withRouter(withStyles(styles)(ChatMessages));
