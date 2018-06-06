import * as types from '../constans/index';
import { combineReducers } from 'redux';

const initialState = {
  activeId: '',
  allIds: [],
  myIds: '',
  byIds: {},
};


const activeIdReducer = (state = initialState.activeId, action) => {
    switch (action) {
      case types.SET_ACTIVE_CHAT:
        return action.payload.chat._id;
      case types.UNSET_ACTIVE_CHAT:
        return '';
      default:
        return state;
    }
}

const allIdsReducer = (state = initialState.allIds, action) => {
    switch (action) {
      case types.FETCH_All_CHATS_SUCCESS:
        return action.payload.chats.map(getChatId)
      default:
        return state;
    }
}

const myIdsReducer = (state = initialState.myIds, action) => {
    switch (action) {
      case types.FETCH_MY_CHATS_SUCCESS:
        return action.payload.chats.map(getChatId)
      default:
        return state;
    }
}

const byIdsReducer = (state = initialState.byIds, action) => {
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
  activeIdReducer,
  allIdsReducer,
  myIdsReducer,
  byIdsReducer
});

export const getChatId = chat => chat._id;
export const getByIds = (state, ids) => ids.map(id => state.byIds[id]);
