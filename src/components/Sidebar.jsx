import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import ExploreIcon from '@material-ui/icons/Explore';
import RestoreIcon from '@material-ui/icons/Restore';

import SidebarChatList from './SidebarChatList.jsx';

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: 320,
  },
  drawerHeader: {
    ...theme.mixins.toolbar,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
  },
  newChatButton: {
    position: 'absolute',
    left: 'auto',
    right: theme.spacing.unit * 3,
    bottom: theme.spacing.unit * 3 + 48,
  },
});

const Sidebar = props => {
  const { classes, chats } = props;

  return (
    <Drawer variant="permanent" classes={{paper: classes.drawerPaper}}>
      <div className={classes.drawerHeader}>
        <TextField fullWidth margin="normal" placeholder="Search chats..." />
      </div>
      <Divider />
      <SidebarChatList chats={chats}/>
      <Button variant="fab" color="primary" className={classes.newChatButton}>
        <AddIcon />
      </Button>
      <BottomNavigation showLabels>
        <BottomNavigationAction label="My Chats" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Explore" icon={<ExploreIcon />} />
      </BottomNavigation>
    </Drawer>
  );
}

export default withStyles(styles)(Sidebar);
