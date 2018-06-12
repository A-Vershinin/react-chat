import * as types from '../constans/chats';
import callApi from '../utils/call-api';
import { redirect } from './services';

export function fetchMyChats() {
  return (dispatch, getState) => {
    const { token } = getState().auth;
    dispatch({
      type: types.FETCH_MY_CHATS_REQUEST,
    })

    return callApi('chats/my', token)
      .then(data => dispatch({
        type: types.FETCH_MY_CHATS_SUCCESS,
        payload: data,
      }))
      .catch(reason => dispatch({
        type: types.FETCH_MY_CHATS_FAILURE,
        payload: reason,
      }))
  };
};

export function fetchAllChats() {
  return (dispatch, getState) => {
    const { token } = getState().auth;
    dispatch({
      type: types.FETCH_All_CHATS_REQUEST,
    })

    return callApi('chats', token)
      .then(data => dispatch({
        type: types.FETCH_All_CHATS_SUCCESS,
        payload: data,
      }))
      .catch(reason => dispatch({
        type: types.FETCH_All_CHATS_FAILURE,
        payload: reason,
      }))
  };
};

export function fetchChat(chatId) {
	return (dispatch, getState) => {
    const { token } = getState().auth;
    dispatch({
      type: types.FETCH_CHAT_REQUEST,
    })

    return callApi(`/chats/${chatId}`, token)
      .then(data => {
        dispatch({
          type: types.FETCH_CHAT_SUCCESS,
          payload: data,
        })
        return data;
      })
      .catch(reason => dispatch({
        type: types.FETCH_CHAT_FAILURE,
        payload: reason,
      }))
	};
};

export function setActiveChat(chatId) {
  return (dispatch) => {
    return dispatch(fetchChat(chatId))
      .then(data => {
        if (!data) {
          dispatch(redirect('/chat'))

          return dispatch({
            type: types.UNSET_ACTIVE_CHAT,
          })
        }
        dispatch({
          type: types.SET_ACTIVE_CHAT,
          payload: data,
        })

      })
  };
};
