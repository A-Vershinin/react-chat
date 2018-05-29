import * as types from '../constans/index';

const token = localStorage.getItem('token');

const initialState = {
	isAuthenticated: !!token,
	user: {},
	token: '',
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
    case types.SIGNUP_FAILURE:
    case types.LOGIN_FAILURE:
    case types.RESIEVE_AUTH_FAILURE:
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: '',
      }
    default:
      return state;
  }
}

export default authReducer;
