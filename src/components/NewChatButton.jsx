import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  newChatButton: {
    position: 'absolute!important',
    left: 'auto',
    right: theme.spacing.unit * 3,
    bottom: theme.spacing.unit * 3 + 48,
  },
});

class NewChatButton extends Component {
  state = {
    title: {
      value: 'Angular.js chat',
      isValid: true,
    }
  }

  handleCreateClick = (event) => {
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

    this.setState({
      title: {
        value: '',
        isValid: true
      }
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Button variant="fab" color="primary"
          className={classes.newChatButton}
          onClick={this.handleCreateClick}>
          <AddIcon />
        </Button>
      </Fragment>
    );
  }
}

export default withStyles(styles)(NewChatButton);
