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
// eslint-disable
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

  getChats() {
    const { chats } = this.props;
    const { activeTab } = this.state;

    return this.filterAndSortChats(activeTab === 0 ? chats.my : chats.all);
  }

  filterAndSortChats = (chats) => {
    const { searchValue } = this.state;
    const sortFunc = (one, two) => ((one.title || '').toLowerCase() <= (two.title || '').toLowerCase() ? -1 : 1);

    // eslint-disable-next-line
    const _chats = chats.sort(sortFunc);

    if (!searchValue) {
      return _chats;
    }

    // eslint-disable-next-line
    return _chats.filter(chat => chat.title.toLowerCase().includes(searchValue.toLowerCase()));
  };

  handleTabChange = (event, value) => {
    this.setState({
      activeTab: value,
    });
  };

  handleSearchChange = (event) => {
    this.setState({
      searchValue: event.target.value,
    });
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
          <ChatList disabled={!isConnected} chats={this.getChats()} activeChat={chats.active} />
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
