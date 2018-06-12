import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ExploreIcon from '@material-ui/icons/Explore';
import RestoreIcon from '@material-ui/icons/Restore';
import NewChatButton from './NewChatButton.jsx';
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
});


class Sidebar extends Component {
  state = {
     value: 0,
   };

   handleTabChange = (event, value) => {
     this.setState({ value });
   };

  render() {
    const { value } = this.state;
    const { classes, chats, createChat } = this.props;
    // console.log("chats", chats)
    return (
      <div>
        <Drawer variant="permanent" classes={{paper: classes.drawerPaper}}>
          <div className={classes.drawerHeader}>
            <TextField fullWidth margin="normal" placeholder="Search chats..." />
          </div>
          <Divider />
          <ChatList chats={chats}/>
          <NewChatButton onCreateChat={createChat}/>
          <BottomNavigation value={value} onChange={this.handleTabChange} showLabels>
            <BottomNavigationAction label="My Chats" icon={<RestoreIcon />} />
            <BottomNavigationAction label="Explore" icon={<ExploreIcon />} />
          </BottomNavigation>
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(Sidebar);
