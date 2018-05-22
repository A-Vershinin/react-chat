import React, { Component, Fragment } from 'react';
import { withStyles } from 'material-ui';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import LoginForm from './LoginForm.jsx';

const styles = theme => ({
  paper: {
    marginTop: 64 + theme.spacing.unit * 3,
    width: 500,
  },
  tabContent: {
    padding: theme.spacing.unit * 3,
  }
});


class WelcomePage  extends Component {
  state = {
    activeTab: 0,
  };

  handleTabChange = (event, value) => {
    this.setState({ activeTab: value });
  };

  render() {
    const { classes, login } = this.props;
    const { activeTab } = this.state;

    return (
      <Fragment>
        <AppBar>
          <Toolbar>
            <Typography variant="title" color="inherit" style={{ flex: 1 }}>
              DogeCodes React Chat
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container justify="center">
          <Grid item>
           <Paper className={classes.paper}>
            <AppBar position="static" color="default">
             <Tabs value={activeTab} fullWidth
              onChange={this.handleTabChange}>
                <Tab label="Login" />
                <Tab label="Sign Up" />
             </Tabs>
            </AppBar>
            <div className={classes.tabContent}>
              {activeTab === 0 && <LoginForm onSubmit={login} />}
              {activeTab === 1 && <h1>Вкладка 2 </h1>}
            </div>
           </Paper>
          </Grid>
        </Grid>
      </Fragment>
    );
  }

}

export default withStyles(styles)(WelcomePage);
