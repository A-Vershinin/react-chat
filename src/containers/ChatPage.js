import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ChatPage from '../components/ChatPage.jsx';
import { fetchMyChats, fetchAllChats, fetchChat, setActiveChat, createChat, deleteChat } from '../actions/chats';
import { logoutAction as logout } from '../actions/auth';
import * as fromChats from '../reducers/chats';


function mapStateToProps(state) {
  const activeChat = fromChats.getById(state.chats, state.chats.activeId);
  // console.log("myChat", activeChat)
  return {
	   chats: {
       active: activeChat,
       all: fromChats.getByIds(state.chats, state.chats.allIds),
       my: fromChats.getByIds(state.chats, state.chats.myIds),
     },
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
	fetchMyChats,
	fetchAllChats,
	fetchChat,
	setActiveChat,
  logout,
  createChat,
  deleteChat,
}, dispatch);


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChatPage)
