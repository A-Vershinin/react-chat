import { connect } from 'react-redux';
import WelcomePage from '../components/WelcomePage.jsx';
import { signupAction, loginAction } from '../actions';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.services.errors.auth,
});

const mapDispatchToProps = dispatch => ({
  signup: (username, password) => dispatch(signupAction(username, password)),
  login: (username, password) => dispatch(loginAction(username, password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WelcomePage);
