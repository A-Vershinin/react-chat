import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  messageInputWrapper: {
    position: 'fixed',
    left: 'auto',
    right: 0,
    bottom: 0,
    width: 'calc(100% - 320px)',
    padding: theme.spacing.unit * 3,
  },
  messageInput: {
    padding: theme.spacing.unit * 2,
  },
});

class InputMessage extends Component {
  state = {
    value: '',
  };

  handleValueChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  handleKeyPress = (event) => {
    const { value } = this.state;

    if (event.key === 'Enter' && value) {
      this.props.onSendMessage(value);
      this.setState({ value: '' });
    }
  };

  render() {
    const {
      classes, onJoinButtonClick, showJoinButton, disabled,
    } = this.props;
    return (
      <div className={classes.messageInputWrapper}>
        <Paper className={classes.messageInput} elevation={6}>
          {showJoinButton ? (
            <Button fullWidth variant="raised" color="primary" disabled={disabled} onClick={onJoinButtonClick}>
              Join
            </Button>
          ) : (
            <Input
              fullWidth
              placeholder="Type your message…"
              disabled={disabled}
              value={this.state.value}
              onChange={this.handleValueChange}
              onKeyPress={this.handleKeyPress}
            />
          )}
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(InputMessage);
