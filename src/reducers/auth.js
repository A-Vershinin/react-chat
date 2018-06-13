import * as types from '../constans/index';

const token = localStorage.getItem('token');

const initialState = {
	isAuthenticated: !!token,
  token,
	user: {},
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.SIGNUP_SUCCESS:
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case types.RESIEVE_AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      }
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: '',
      }
    case types.EDIT_USER_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          username: action.data.user.username,
          firstName: action.data.user.firstName,
          lastName: action.data.user.lastName
        }
      }
    case types.SIGNUP_FAILURE:
    case types.LOGIN_FAILURE:
    case types.RESIEVE_AUTH_FAILURE:
    case types.EDIT_USER_FAILURE:
    default:
      return state;
  }
}

export default authReducer;
