import * as types from '../constans/chats';
import callApi from '../utils/call-api';
import { redirect } from './services';

export function fetchMyChats() {
  return (dispatch, getState) => {
    const state = getState();
    const { token } = state.auth;
    const { isFetching } = state.services;

    if (isFetching.myChats) {
      return Promise.resolve();
    }

    dispatch({
      type: types.FETCH_MY_CHATS_REQUEST,
    });

    return callApi('chats/my', token)
      .then(data =>
        dispatch({
          type: types.FETCH_MY_CHATS_SUCCESS,
          payload: data,
        }))
      .catch(reason =>
        dispatch({
          type: types.FETCH_MY_CHATS_FAILURE,
          payload: reason,
        }));
  };
}

export function fetchAllChats() {
  return (dispatch, getState) => {
    const state = getState();
    const { token } = state.auth;
    const { isFetching } = state.services;

    if (isFetching.allChats) {
      return Promise.resolve();
    }

    dispatch({
      type: types.FETCH_All_CHATS_REQUEST,
    });

    return callApi('chats', token)
      .then(data =>
        dispatch({
          type: types.FETCH_All_CHATS_SUCCESS,
          payload: data,
        }))
      .catch(reason =>
        dispatch({
          type: types.FETCH_All_CHATS_FAILURE,
          payload: reason,
        }));
  };
}

export function fetchChat(chatId) {
  return (dispatch, getState) => {
    const state = getState();
    const { token } = state.auth;
    const { isFetching } = state.services;

    if (isFetching.chat) {
      return Promise.resolve();
    }

    dispatch({
      type: types.FETCH_CHAT_REQUEST,
    });

    return callApi(`chats/${chatId}`, token)
      .then((data) => {
        dispatch({
          type: types.FETCH_CHAT_SUCCESS,
          payload: data,
        });

        return data;
      })
      .catch((reason) => {
        dispatch({
          type: types.FETCH_CHAT_FAILURE,
          payload: reason,
        });

        dispatch(redirect('/chat'));
      });
  };
}

export function setActiveChat(chatId) {
  return dispatch =>
    dispatch(fetchChat(chatId)).then((data) => {
      if (!data) {
        dispatch(redirect('/chat'));

        return dispatch({
          type: types.UNSET_ACTIVE_CHAT,
        });
      }

      dispatch({
        type: types.SET_ACTIVE_CHAT,
        payload: data,
      });

      // eslint-disable-next-line
      return dispatch(redirect(`/chat/${data.chat._id}`));
    });
}

export function createChat(title) {
  return (dispatch, getState) => {
    const state = getState();
    const { token } = state.auth;
    const { isFetching } = state.services;

    if (isFetching.createChat) {
      return Promise.resolve();
    }

    dispatch({
      type: types.CREATE_CHAT_REQUEST,
      payload: { title },
    });

    return callApi(
      'chats',
      token,
      { method: 'POST' },
      {
        data: { title },
      },
    )
      .then((data) => {
        const { chat } = data;

        dispatch({
          type: types.CREATE_CHAT_SUCCESS,
          payload: data,
        });

        dispatch(fetchMyChats());
        // eslint-disable-next-line
        dispatch(redirect(`/chat/${chat._id}`));
        return chat;
      })
      .catch(reason =>
        dispatch({
          type: types.CREATE_CHAT_FAILURE,
          payload: reason,
        }));
  };
}

export function deleteChat(chatId) {
  return (dispatch, getState) => {
    const state = getState();
    const { token } = state.auth;
    const { isFetching } = state.services;

    if (isFetching.deleteChat) {
      return Promise.resolve();
    }

    dispatch({
      type: types.DELETE_CHAT_REQUEST,
      payload: { chatId },
    });

    return callApi(`chats/${chatId}`, token, { method: 'DELETE' })
      .then((data) => {
        dispatch({
          type: types.DELETE_CHAT_SUCCESS,
          payload: data,
        });

        dispatch(redirect('/chat'));
        dispatch({
          type: types.UNSET_ACTIVE_CHAT,
        });

        return data;
      })
      .catch(reason =>
        dispatch({
          type: types.DELETE_CHAT_FAILURE,
          payload: reason,
        }));
  };
}

export function joinChat(chatId) {
  return (dispatch, getState) => {
    const state = getState();
    const { token } = state.auth;
    const { isFetching } = state.services;

    if (isFetching.joinChat) {
      return Promise.resolve();
    }

    dispatch({
      type: types.JOIN_CHAT_REQUEST,
      payload: { chatId },
    });

    return callApi(`chats/${chatId}/join`, token)
      .then(({ chat }) => {
        dispatch({
          type: types.JOIN_CHAT_SUCCESS,
          payload: { chat },
        });

        // eslint-disable-next-line
        dispatch(redirect(`/chat/${chat._id}`));
        return chat;
      })
      .catch(reason =>
        dispatch({
          type: types.JOIN_CHAT_FAILURE,
          payload: reason,
        }));
  };
}

export function leaveChat(chatId) {
  return (dispatch, getState) => {
    const state = getState();
    const { token } = state.auth;
    const { isFetching } = state.services;

    if (isFetching.leaveChat) {
      return Promise.resolve();
    }

    dispatch({
      type: types.LEAVE_CHAT_REQUEST,
      payload: { chatId },
    });

    return callApi(`chats/${chatId}/leave`, token)
      .then((data) => {
        dispatch({
          type: types.LEAVE_CHAT_SUCCESS,
          payload: data,
        });

        dispatch(redirect('/chat'));

        dispatch({
          type: types.UNSET_ACTIVE_CHAT,
        });

        return data;
      })
      .catch(reason =>
        dispatch({
          type: types.LEAVE_CHAT_FAILURE,
          payload: reason,
        }));
  };
}
