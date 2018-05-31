import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import WelcomePage from '../components/WelcomePage.jsx';
import { signupAction, loginAction } from '../actions';


const mapStateToProps = state => {
  // console.log(state)
  return {
    isAuthenticated: state.auth.isAuthenticated,
  }
}


const mapDispatchToProps = dispatch => ({
  signup: (username, password) => dispatch(signupAction(username, password)),
  login: (username, password) => dispatch(loginAction(username, password)),
});

// const mapDispatchToProps = dispatch => bindActionCreators ({
//   signup,
//   login,
// }, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(WelcomePage)
