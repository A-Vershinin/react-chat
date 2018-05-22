import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ChatPage from './ChatPage.jsx';

class App extends Component {
  render() {
    return (
      <Router>
        <Route path='/chat' component={ChatPage} />
      </Router>
    );
  }
}

export default App;
