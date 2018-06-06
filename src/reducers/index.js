import { combineReducers } from 'redux';
import authReducer from './auth';
import chatsReducer from './chats';

const reducer = combineReducers({
  auth: authReducer,
  chats: chatsReducer,
});

export default reducer;
