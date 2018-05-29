import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import PrivateRoute from '../containers/PrivateRoute';
import ChatPage from '../containers/ChatPage';
import WelcomePage from '../containers/WelcomePage';
import configureStore from '../store/index';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path='/' component={WelcomePage} />
            <Route exact path='/welcome' component={WelcomePage} />
            <PrivateRoute path='/chat' component={ChatPage} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
