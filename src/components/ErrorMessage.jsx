import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

class ErrorMessage extends React.Component {
  state = {
    open: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
        this.setState({ open: true });
    }
  }

  handleCloseSnackbar = (event, reason) => {
    this.setState({ open: false });
  };

  render() {
    const { error } = this.props;

    if (!error) {
      return null;
    }

    return (
      <Snackbar
        anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
        autoHideDuration={6000}
        open={this.state.open}
        onClose={this.handleCloseSnackbar}
        message={<span>{error.message}</span>}
        action={[
          <IconButton
            key="close" aria-label="Close" color="inherit"
            onClick={this.handleCloseSnackbar}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    );
  }
}

export default ErrorMessage;
