import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { resieveAuth } from '../actions';

class PrivateRoute extends Component {

  componentDidMount() {
    this.props.resieveAuth();
  }

  render() {
    const { component: Component, isAuthenticated, ...rest } = this.props;

    return (
      <Route {...rest} render={props => (
        isAuthenticated ? (
          <Component { ...rest} />) : (
          <Redirect to={
            { pathname: "/welcome",
            state: { from: props.location }
          }} /> )
      )} />
    );
  }
}


function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  }
};

const mapDispatchToProps = dispatch => ({
    resieveAuth: () => dispatch(resieveAuth()),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateRoute));