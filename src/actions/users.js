import * as types from '../constans/users.js';
import callApi from '../utils/call-api';

export function editUser({ username, firstName, lastName }) {
  return (dispatch, getState) => {
    const { token } = getState().auth;

    dispatch({
      type: types.EDIT_USER_REQUEST
    })

    return callApi('users/me', token, { method: 'POST' }, {
      data: { username, firstName, lastName }
    })
      .then(json => dispatch({
        type: types.EDIT_USER_SUCCESS,
        data: json,
      }))
      .catch(reason => dispatch({
        type: types.EDIT_USER_FAILURE,
        data: reason,
      }));
  };
}
