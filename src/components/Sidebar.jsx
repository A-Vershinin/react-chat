import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    chats: PropTypes.shape({
      active: PropTypes.object,
      all: PropTypes.array.isRequired,
      my: PropTypes.array.isRequired,
    }).isRequired,
    createChat: PropTypes.func.isRequired,
    isConnected: PropTypes.bool.isRequired,
  };

  state = {
    activeTab: 0,
    searchValue: '',
  };

  handleSearchChange = (event) => {
    this.setState({
      searchValue: event.target.value,
    });
  };

  handleTabChange = (event, value) => {
    this.setState({
      activeTab: value,
    });
  };

  filterChats = (chats) => {
    const { searchValue } = this.state;

    return chats
      .filter(chat => chat.title.toLowerCase().includes(searchValue.toLowerCase()))
      .sort((one, two) => (one.title.toLowerCase() <= two.title.toLowerCase() ? -1 : 1));
  };

  render() {
    const { searchValue, activeTab } = this.state;
    const {
      classes, chats, createChat, isConnected,
    } = this.props;

    return (
      <div>
        <Drawer variant="permanent" classes={{ paper: classes.drawerPaper }}>
          <div className={classes.drawerHeader}>
            <TextField
              fullWidth
              margin="normal"
              placeholder="Search chats..."
              value={searchValue}
              onChange={this.handleSearchChange}
            />
          </div>
          <Divider />
          <ChatList
            disabled={!isConnected}
            chats={this.filterChats(activeTab === 0 ? chats.my : chats.all)}
            activeChat={chats.active}
          />
          <NewChatButton disabled={!isConnected} onCreateChat={createChat} />
          <BottomNavigation value={activeTab} onChange={this.handleTabChange} showLabels>
            <BottomNavigationAction label="My Chats" icon={<RestoreIcon />} />
            <BottomNavigationAction label="Explore" icon={<ExploreIcon />} />
          </BottomNavigation>
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(Sidebar);
