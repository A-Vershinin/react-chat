import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ChatPage from '../components/ChatPage.jsx';
import { fetchMyChats, fetchAllChats, fetchChat, setActiveChat } from '../actions/chats';
import * as fromChats from '../reducers/chats';


const mapStateToProps = state => ({
	chats: fromChats.getByIds(state.chats, state.chats.allIds),
});

// const mapDispatchToProps = dispatch => ({
//
// });

// const mapDispatchToProps = (dispatch) => ({
//   ...bindActionCreators(resieveAuth, dispatch),
// });

const mapDispatchToProps = dispatch => bindActionCreators({
	fetchMyChats,
	fetchAllChats,
	fetchChat,
	setActiveChat,
}, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChatPage)
