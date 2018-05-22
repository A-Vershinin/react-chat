import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ChatPage from './ChatPage.jsx';
import WelcomePage from './WelcomePage.jsx'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={WelcomePage} />
          <Route exact path='/welcome' component={WelcomePage} />
          <Route path='/chat' component={ChatPage} />
          <Redirect to="/" />
        </Switch>
      </Router>
    );
  }
}

export default App;
