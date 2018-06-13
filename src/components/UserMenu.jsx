import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  userMenu: {
    marginLeft: 'auto',
  },
  modalWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '30%',
    minWidth: '300px',
    padding: theme.spacing.unit * 3
  }
});

class UserMenu extends Component {
  state = {
    anchorEl: null,
    isModalOpen: false,
    username: '',
    firstName: '',
    lastName: '',
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      username: nextProps.activeUser.username,
      firstName: nextProps.activeUser.firstName,
      lastName: nextProps.activeUser.lastName,
    })
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleLogoutClick = () => {
    this.props.onLogoutClick();
    this.handleClose();
  }

  toggleEditProfileModal = () => {
     this.setState({ isModalOpen: !this.state.isModalOpen })
     this.handleClose();
   }

   handleSaveClick = () => {
     this.props.onEditProfileClick({
       username: this.state.username,
       firstName: this.state.firstName,
       lastName: this.state.lastName,
     });
     this.toggleEditProfileModal();
   }

  render() {
    const { anchorEl, isModalOpen  } = this.state;
    const { classes, disabled } = this.props;

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
            open={Boolean(anchorEl)}
            onClose={this.handleClose}>
            <MenuItem onClick={this.toggleEditProfileModal}>Edit Profile</MenuItem>
            <MenuItem onClick={this.handleLogoutClick}>Logout</MenuItem>
          </Menu>
          <Modal
            open={isModalOpen}
            className={classes.modalWrapper}
            onClose={this.toggleEditProfileModal}
          >
            <Paper className={classes.modal}>
              <Typography variant="title" id="modal-title">
                Edit profile
              </Typography>
              <TextField
                required
                fullWidth
                name="username"
                label="Username"
                placeholder="Enter you username..."
                type="text"
                margin="normal"
                value={this.state.username}
                onChange={this.handleInputChange}
              />
              <TextField
                fullWidth
                name="firstName"
                label="First name"
                placeholder="Enter you first name..."
                type="text"
                margin="normal"
                value={this.state.firstName}
                onChange={this.handleInputChange}
              />
              <TextField
                fullWidth
                name="lastName"
                label="Last name"
                placeholder="Enter you last name..."
                type="text"
                margin="normal"
                value={this.state.lastName}
                onChange={this.handleInputChange}
              />
              <Button color="primary" onClick={this.handleSaveClick}>Save</Button>
              <Button onClick={this.toggleEditProfileModal}>Close</Button>
            </Paper>
          </Modal>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(styles)(UserMenu);
