import * as types from '../constans/sockets';
import SocketIOClient from 'socket.io-client';
import { redirect } from './services';

export const missingSocketConnecton() {
  return {
    type: types.SOCKETS_CONNECTION_MISSING,
  }
}

let socket = null;

export const socketsConnect() {
  return (dispatch, getState) => {
    const { token } = getState().auth;

    dispatch({
      type: types.SOCKETS_CONNECTION_REQUEST,
    });

    socket = SocketIOClient('ws://localhost:3000/', {
      query: { token }
    });

    socket.on('connect', () => {
      dispatch({
        type: types.SOCKETS_CONNECTION_SUCCESS,
      });
    });

    socket.error('error', () => {
      dispatch({
        type: types.SOCKETS_CONNECTION_FAILURE,
      });
    });

    socket.error('connect_error', () => {
      dispatch({
        type: types.SOCKETS_CONNECTION_FAILURE,
      });
    });

    socket.on('new-message', (message) => {
      dispatch({
        type: types.RECIEVE_MESSAGE,
        payload: message,
      });
    });

    socket.on('new-chat', ({ chat }) => {
      dispatch({
        type: types.RECIEVE_NEW_CHAT,
        payload: chat,
      });
    });

    socket.on('deleted-chat', ({ chat }) => {
      const { activeId } = getState().chats;

      dispatch({
        type: types.RECIEVE_DELETED_CHAT,
        payload: chat,
      });

      if (activeId === chat._id) {
        dispatch(redirect('/chat'));
      }
    });
  }
}

export const sendMessageConnect() {
  return (dispatch, getState) => {

    dispatch({
      type: types.SOCKETS_CONNECTION_REQUEST,
    })

  }
}
