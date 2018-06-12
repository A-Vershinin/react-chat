import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import UserMenu from './UserMenu.jsx';
import ChatMenu from './ChatMenu.jsx';

const styles = theme => ({
  appBar: {
    position: 'fixed',
    width: `calc(100% - 320px)`,
    flexGrow: 1,
    marginLeft: 320,
  },
  appBarTitle: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    color: theme.palette.secondary.contrastText,
  },
});

class ChatHeader extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar color="contrast">
          <Typography variant="title" color="inherit" noWrap className={classes.appBarTitle}>
            DogeCodes React Chat
          </Typography>
          <ChatMenu />
          <UserMenu />
        </Toolbar>
      </AppBar>
    );
  }
}


export default withStyles(styles)(ChatHeader);
