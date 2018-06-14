import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ChatPage from '../components/ChatPage.jsx';
import { fetchMyChats, fetchAllChats, fetchChat, setActiveChat, createChat, deleteChat, joinChat, leaveChat } from '../actions/chats';
import { logoutAction as logout } from '../actions/auth';
import { editUser } from '../actions/users';
import { sendMessage, mountChat, unmountChat, socketsConnect } from '../actions/sockets';
import * as fromChats from '../reducers/chats';
import * as fromState from '../reducers';


function mapStateToProps(state) {
  const activeChat = fromChats.getById(state.chats, state.chats.activeId);

  return {
    isAuthenticated: state.auth.isAuthenticated,
    chats: {
      active: activeChat,
      all: fromChats.getByIds(state.chats, state.chats.allIds),
      my: fromChats.getByIds(state.chats, state.chats.myIds),
    },
    activeUser: {
      ...state.auth.user,
      isMember: fromState.isMember(state, activeChat),
      isCreator: fromState.isCreator(state, activeChat),
      isChatMember: fromState.isChatMember(state, activeChat),
    },
    messages: state.messages,
    error: state.services.errors.chat,
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
  joinChat,
  leaveChat,
  editUser,
  sendMessage,
  mountChat,
  unmountChat,
  socketsConnect
}, dispatch);


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChatPage)
