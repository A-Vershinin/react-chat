import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigation';
import ExploreIcon from '@material-ui/icons/Explore';
import RestoreIcon from '@material-ui/icons/Restore';

import ChatList from './ChatList.jsx';

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    height: '100vh',
    width: 320,
  },
  drawerHeader: {
    ...theme.mixins.toolbar,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
  },
  newChatButton: {
    position: 'absolute!important',
    left: 'auto',
    right: theme.spacing.unit * 3,
    bottom: theme.spacing.unit * 3 + 48,
  },
});


class Sidebar extends Component {
  render() {
    const { classes, chats } = this.props;

    return (
      <div>
        <Drawer variant="permanent" classes={{paper: classes.drawerPaper}}>
          <div className={classes.drawerHeader}>
            <TextField fullWidth margin="normal" placeholder="Search chats..." />
          </div>
          <Divider />
          <ChatList chats={chats}/>
          <Button variant="fab"  color="primary" className={classes.newChatButton} >
            <AddIcon />
          </Button>
          <BottomNavigation showLabels>
            <BottomNavigationAction label="My Chats" value="my chats" icon={<RestoreIcon />}  />
            <BottomNavigationAction label="Explore" value="explore" icon={<ExploreIcon />} />
          </BottomNavigation>
        </Drawer>
      </div>
    );
  }
}



export default withStyles(styles)(Sidebar);
