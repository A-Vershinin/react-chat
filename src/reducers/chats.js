import * as types from '../constans/index';
import { combineReducers } from 'redux';

const initialState = {
  activeId: '',
  allIds: [],
  myIds: '',
  byIds: {},
};


const activeIdReducer = (state = initialState.actionId, action) => {
    switch (action) {
      case types.SET_ACTIVE_CHAT:
        return action.payload.chat._id;
      case types.UNSET_ACTIVE_CHAT:
        return '';
      default:
        return state;
    }
}

const allIdsReducer = (state = initialState.actionId, action) => {
    switch (action) {
      default:
        return state;
    }
}

const myIdsReducer = (state = initialState.actionId, action) => {
    switch (action) {
      default:
        return state;
    }
}

const byIdsReducer = (state = initialState.actionId, action) => {
    switch (action) {
      default:
        return state;
    }
}

export function chatsReducer(state = initialState, action) {
  switch (action.type) {
    case types.SIGNUP_SUCCESS:

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
