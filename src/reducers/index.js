import { combineReducers } from 'redux';
import authReducer from './auth';
import chatsReducer from './chats';
import messagesReducer from './messages';
import servicesReducer from './services.js';

const reducer = combineReducers({
  auth: authReducer,
  chats: chatsReducer,
  messages: messagesReducer,
  services: servicesReducer,
});

export const getActiveUser = (state) => state.auth.user;
export const getUserId = (user) => user._id;

export const isCreator = (state, chat) => {
  try {
    return getUserId(chat.creator) === getUserId(getActiveUser(state));
  } catch (e) {
    return false;
  }
};

export const isMember = (state, chat) => {
  try {
    return chat.members.some(
      member => getUserId(member) === getUserId(getActiveUser(state))
    );
  } catch (e) {
    return false;
  }
};

export const isChatMember = (state, chat) => {
  return isCreator(state, chat) || isMember(state, chat);
}

export default reducer;
