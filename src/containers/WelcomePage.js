import { connect } from 'react-redux';
import WelcomePage from '../components/WelcomePage.jsx';
import { signup, login } from '../actions';


const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated,
});


const mapDispatchToProps = dispatch => ({
  signup: (username, password) => dispatch(signup(username, password)),
  login: (username, password) => dispatch(signup(username, password)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(WelcomePage)
