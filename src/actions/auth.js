/* eslint consistent-return: 0 */
import * as types from '../constans/auth';
import callApi from '../utils/call-api';

export function signupAction(username, password) {
  return (dispatch, getState) => {
    const { isFetching } = getState().services;

    if (isFetching.signup) {
      return Promise.resolve();
    }

    dispatch({
      type: types.SIGNUP_REQUEST,
    });

    return callApi(
      '/signup',
      undefined,
      { method: 'POST' },
      {
        username,
        password,
      },
    )
      .then((json) => {
        if (!json.token) {
          throw new Error('Token has not been provided!');
        }
        // save JWT to localStorage
        localStorage.setItem('token', json.token);
        dispatch({
          type: types.SIGNUP_SUCCESS,
          payload: json,
        });
      })
      .catch(reason =>
        dispatch({
          type: types.SIGNUP_FAILURE,
          payload: reason,
        }));
  };
}

export function loginAction(username, password) {
  return (dispatch, getState) => {
    const { isFetching } = getState().services;

    if (isFetching.login) {
      return Promise.resolve();
    }

    dispatch({
      type: types.LOGIN_REQUEST,
    });
    return callApi(
      'login',
      undefined,
      { method: 'POST' },
      {
        username,
        password,
      },
    )
      .then((json) => {
        if (!json.token) {
          throw new Error('Token has not been provided!');
        }
        // save JWT to localStorage
        localStorage.setItem('token', json.token);
        dispatch({
          type: types.LOGIN_SUCCESS,
          payload: json,
        });
      })
      .catch(reason =>
        dispatch({
          type: types.LOGIN_FAILURE,
          payload: reason,
        }));
  };
}

export function logoutAction() {
  return (dispatch, getState) => {
    const { isFetching } = getState().services;

    if (isFetching.logout) {
      return Promise.resolve();
    }

    dispatch({
      type: types.LOGOUT_REQUEST,
    });
    return callApi('logout')
      .then((json) => {
        // remove JWT from localStorage
        localStorage.removeItem('token');

        // redirect to welcome page when case failure
        dispatch({
          type: types.LOGOUT_SUCCESS,
          payload: json,
        });
      })
      .catch(reason =>
        dispatch({
          type: types.LOGOUT_FAILURE,
          payload: reason,
        }));
  };
}

// eslint-disable-next-line
export function resieveAuth() {
  return (dispatch, getState) => {
    const state = getState();
    const { token } = state.auth;
    const { isFetching } = state.services;

    if (isFetching.resieveAuth) {
      return Promise.resolve();
    }

    if (!token) {
      dispatch({
        type: types.RESIEVE_AUTH_FAILURE,
      });
    }

    callApi('users/me', token)
      .then(json =>
        dispatch({
          type: types.RESIEVE_AUTH_SUCCESS,
          payload: json,
        }))
      .catch(reason =>
        dispatch({
          type: types.RESIEVE_AUTH_FAILURE,
          payload: reason,
        }));
  };
}
