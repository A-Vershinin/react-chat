import * as types from '../constans/index';
import { combineReducers } from 'redux';

const initialState = {
  activeId: '',
  allIds: [],
  myIds: '',
  byIds: {},
};


const activeId = (state = initialState.activeId, action) => {
    switch (action) {
      case types.SET_ACTIVE_CHAT:
        return getChatId(action.payload.chat);
      case types.UNSET_ACTIVE_CHAT:
        return '';
      default:
        return state;
    }
}

const allIds = (state = initialState.allIds, action) => {
    switch (action) {
      case types.FETCH_All_CHATS_SUCCESS:
        return action.payload.chats.map(getChatId);
      default:
        return state;
    }
}

const myIds = (state = initialState.myIds, action) => {
    switch (action) {
      case types.FETCH_MY_CHATS_SUCCESS:
         return action.payload.chats.map(getChatId);
      default:
        return state;
    }
}

const byIds = (state = initialState.byIds, action) => {
    switch (action) {
      case types.FETCH_All_CHATS_SUCCESS:
      case types.FETCH_MY_CHATS_SUCCESS:
        return {
          ...state,
          ...action.payload.chats.reduce((ids, chat) => ({
            ...ids,
            [chat._id]: chat,
          }), {}),
        }
      default:
        return state;
    }
}

export default combineReducers({
  activeId,
  allIds,
  myIds,
  byIds
});

export const getChatId = (chat) => chat._id;
export const getById = (state, id) => state.byIds[id];
export const getByIds = (state, ids) => ids.map(id => getById(state, id));
