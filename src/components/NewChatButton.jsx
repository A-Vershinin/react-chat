import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import blue from '@material-ui/core/colors/blue';

const styles = theme => ({
  newChatButton: {
    position: 'absolute!important',
    left: 'auto',
    right: theme.spacing.unit * 3,
    bottom: theme.spacing.unit * 3 + 48,
  },
  modalWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    outlineColor: blue[900],
    width: '40%',
    minWidth: '400px',
    minHeight: '250px',
    padding: theme.spacing.unit * 3
  }
});

class NewChatButton extends Component {
  state = {
    open: false,
    title: {
      value: '',
      isValid: true,
    }
  }

  toggleModal = () => {
    this.setState({ open: !this.state.open })
  }

  handleTitleChange = (event) => {
    this.setState({
      title: {
        value: event.target.value,
        isValid: true,
      }
    });
  }

  handleCreateChat = (event) => {
    event.preventDefault();
    const { title } = this.state;

    if (!title.value) {
      this.setState({
        title: {
          value: title.value,
          isValid: false
        }
      })
      return;
    }

    this.props.onCreateChat(title.value);
    this.toggleModal();
    this.setState({
      title: {
        value: '',
        isValid: true
      }
    });
  }

  render() {
    const { open, title } = this.state;
    const { classes } = this.props;

    return (
      <Fragment>
        <Button variant="fab" color="primary"
          className={classes.newChatButton}
          onClick={this.toggleModal}>
          <AddIcon />
        </Button>
        <Modal
          open={open}
          className={classes.modalWrapper}
          onClose={this.toggleModal}
        >
          <Paper className={classes.modal}>
            <Typography variant="title" id="modal-title">
              Create new chat
            </Typography>
            <TextField
              required
              fullWidth
              label="New chat"
              placeholder="Type the title..."
              type="text"
              margin="normal"
              autoComplete="new-chat"
              value={title.value}
              onChange={this.handleTitleChange}
              error={!title.isValid}
            />
            <Button
              color="primary"
              onClick={this.handleCreateChat}
            >
              Create
            </Button>
          </Paper>
        </Modal>
      </Fragment>
    );
  }
}

export default withStyles(styles)(NewChatButton);
