import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';

const styles = theme => ({
  userMenu: {
    marginLeft: 'auto',
  },
});

class UserMenu extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { auth, anchorEl } = this.state;
    const { classes, disabled = false } = this.props;
    const open = Boolean(anchorEl);

    return (
      <Fragment>
        <div className={classes.userMenu}>
          <IconButton
            color="inherit" aria-owns={anchorEl ? 'simple-menu' : null}
            aria-haspopup="true" disabled={disabled} onClick={this.handleClick}>
            <AccountCircle />
          </IconButton>
          <Menu id="menu-appbar"
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            anchorEl={anchorEl}
            open={open}
            onClose={this.handleClose}>
            <MenuItem onClick={this.handleClose}>Profile</MenuItem>
            <MenuItem onClick={this.handleClose}>My account</MenuItem>
          </Menu>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(styles)(UserMenu);
