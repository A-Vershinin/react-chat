import React from 'react';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText'
import Paper from '@material-ui/core/Paper';
import Avatar from 'material-ui/Avatar';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import ExploreIcon from '@material-ui/icons/Explore';
import RestoreIcon from '@material-ui/icons/Restore';

import { chats, messages } from './mock-data.json';


const styles = theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.default,
  },
  appFrame: {
    height: 430,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%'
  },
  appBar: {
    position: 'fixed',
    width: `calc(100% - 320px)`
  },
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
  chatLayout: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    overflow: 'hidden',
  },
  messagesWrapper: {
    overflowX: 'scroll',
    height: '100%',
    width: '100%',
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: '120px',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  },
});

class Layout extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
            <Typography variant="title" color="inherit" noWrap>
              DogeCodes React Chat
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <TextField
              fullWidth
              margin="normal"
              placeholder="Search chats..."
            />
          </div>
          <Divider />
          <List className={classes.chatsList}>
            {
              chats.map((chat, index) => (
                <ListItem key={index} button>
                  <Avatar>{chat.title && chat.title[0]}</Avatar>
                  <ListItemText primary={chat.title}/>
                </ListItem>
              ))
            }
          </List>
          <Button variant="fab" color="primary" className={classes.newChatButton}>
            <AddIcon />
          </Button>
          <BottomNavigation showLabels>
            <BottomNavigationAction label="My Chats" icon={<RestoreIcon />} />
            <BottomNavigationAction label="Explore" icon={<ExploreIcon />} />
          </BottomNavigation>
        </Drawer>
        <main className={classes.chatLayout}>
          <div className={classes.messagesWrapper}>
          {
            messages && messages.map((message, index) => {
              const userAvatar = (
                <Avatar> {message.sender[0]} </Avatar>
              );

              return (
              <div key={index}
                className={[classes.messageWrapper, classes.messageWrappperFromMe].join(' ')}>
                {userAvatar}
                <Paper className={classes.message}>
                  <Typography variant="caption">
                    {message.sender}
                  </Typography>
                  <Typography variant="body1">
                    {message.content}
                  </Typography>
                </Paper>
              </div>
            );
          })
        }
          </div>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(Layout);
