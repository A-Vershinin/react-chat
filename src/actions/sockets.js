/* eslint consistent-return: 0 */
import SocketIOClient from 'socket.io-client';
import { redirect } from './services';
import * as types from '../constans/sockets';
import config from '../config';

export function missingSocketConnecton() {
  return { type: types.SOCKETS_CONNECTION_MISSING, pyaload: new Error('Missing connection!') };
}

let socket = null;

export function socketsConnect() {
  return (dispatch, getState) => {
    const state = getState();
    const { token } = state.auth;
    const { isFetching } = state.services;

    if (isFetching.sockets) {
      return Promise.resolve();
    }

    dispatch({ type: types.SOCKETS_CONNECTION_REQUEST });

    socket = SocketIOClient(config.SOCKETS_URI, {
      query: { token },
    });

    socket.on('connect', () => {
      dispatch({ type: types.SOCKETS_CONNECTION_SUCCESS });
    });

    socket.on('error', (error) => {
      dispatch({
        type: types.SOCKETS_CONNECTION_FAILURE,
        payload: new Error(`Connection ${error}`),
      });
    });

    socket.on('connect_error', () => {
      dispatch({
        type: types.SOCKETS_CONNECTION_FAILURE,
        payload: new Error('We have lost a connection :('),
      });
    });

    socket.on('new-message', (message) => {
      dispatch({ type: types.RECIEVE_MESSAGE, payload: message });
    });

    socket.on('new-chat', (data) => {
      dispatch({
        type: types.RECIEVE_NEW_CHAT,
        payload: data,
      });
    });

    socket.on('deleted-chat', (data) => {
      const { activeId } = getState().chats;
      const { chat } = data;

      dispatch({
        type: types.RECIEVE_DELETED_CHAT,
        payload: data,
      });

      // eslint-disable-next-line
      if (activeId === chat._id) {
        dispatch(redirect('/chat'));
      }
    });
  };
}

export function sendMessage(content) {
  return (dispatch, getState) => {
    const { activeId } = getState().chats;

    if (!socket) {
      dispatch(missingSocketConnecton());
    }

    socket.emit(
      'send-message',
      {
        chatId: activeId,
        content,
      },
      () => {
        dispatch({
          type: types.SEND_MESSAGE,
          payload: {
            chatId: activeId,
            content,
          },
        });
      },
    );
  };
}

export function mountChat(chatId) {
  return (dispatch) => {
    if (!socket) {
      dispatch(missingSocketConnecton());
    }

    socket.emit('mount-chat', chatId);

    dispatch({
      type: types.MOUNT_CHAT,
      payload: chatId,
    });
  };
}

export function unmountChat(chatId) {
  return (dispatch) => {
    if (!socket) {
      dispatch(missingSocketConnecton());
    }

    socket.emit('unmount-chat', chatId);

    dispatch({
      type: types.UNMOUNT_CHAT,
      payload: chatId,
    });
  };
}
