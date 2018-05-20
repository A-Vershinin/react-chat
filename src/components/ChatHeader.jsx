import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  appBar: {
    position: 'fixed',
    width: `calc(100% - 320px)`
  },
});

class ChatHeader extends Component {
  render() {
        const { classes } = this.props;
    return (
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <Typography variant="title" color="inherit" noWrap>
            DogeCodes React Chat
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }

}


export default withStyles(styles)(ChatHeader);
