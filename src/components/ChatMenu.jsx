import React, { Component, Fragment } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';

class ChatMenu extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLeaveClick = () => {
    this.handleClose();
  }

  handleDeleteClick = () => {
    this.handleClose();
  }
  render() {
    const { anchorEl } = this.state;
    const { classes, disabled = false } = this.props;

    return (
      <Fragment>
        <IconButton color="inherit" aria-owns={anchorEl ? 'simple-menu' : null}
            aria-haspopup="true"
            disabled={disabled}
            onClick={this.handleClick}>
            <MoreIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleLeaveClick}>Leave</MenuItem>
          <MenuItem onClick={this.handleDeleteClick}>Delete</MenuItem>
        </Menu>
      </Fragment>
    );
  }

}

export default ChatMenu;
