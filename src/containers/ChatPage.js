import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ChatPage from '../components/ChatPage.jsx';
import { fetchMyChats, fetchAllChats, fetchChat, setActiveChat, createChat } from '../actions/chats';
import { logoutAction as logout } from '../actions/auth';
import * as fromChats from '../reducers/chats';


function mapStateToProps(state) {
  // console.log("activeId", )
  return {
	   chats: {
      //  active: fromChats.getById(state.chats, state.chats.activeId),
       all: fromChats.getByIds(state.chats, state.chats.allIds),
      //  my: fromChats.getByIds(state.chats, state.chats.myIds),
     },
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
	fetchMyChats,
	fetchAllChats,
	// fetchChat,
	// setActiveChat,
  logout,
  createChat,
}, dispatch);


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChatPage)
