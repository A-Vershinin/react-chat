import {
	SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE,
} from '../constans/index';

export function signupAction(username, password) {
	return (dispatch) => {
		dispatch({
			type: SIGNUP_REQUEST,
		})


    fetch('http://localhost:8000/v1/signup', {
       method: "POST",
       body: JSON.stringify({
         username, password
       }),
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
     })
     .then(response => response.json())
     .then(json => {
			 if (json.success) {
				 return json
			 }
			 throw new Error(json.message)
		 })
		 .then(json => {
			 	if (!json.token) {
					throw new Error ('Token has not been provided!')
				}
				// save JWT to localStorage
				localStorage.setItem('token', json.token);
        dispatch({
				 type: SIGNUP_SUCCESS,
				 payload: json,
			})
    })
     .catch(reason => dispatch({
				 type: SIGNUP_FAILURE,
				 payload: reason,
			 })
		 );
	};
}

export function loginAction(username, password) {
	return (dispatch) => {
		dispatch({
			type: LOGIN_REQUEST,
		})
		fetch('http://localhost:8000/v1/login', {
       method: "POST",
       body: JSON.stringify({
         username, password
       }),
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
     })
     .then(response => response.json())
		 .then(json => {
			if (json.success) {
				return json
			}
			throw new Error(json.message)
		})
		.then(json => {
				 if (!json.token) {
					 throw new Error ('Token has not been provided!')
				 }
				 // save JWT to localStorage
				 localStorage.setItem('token', json.token);
				 dispatch({
					type: LOGIN_SUCCESS,
					payload: json,
			 })
		 })
     .catch(reason => dispatch({
				 type: LOGIN_FAILURE,
				 payload: reason,
			 })
		 );
	};
}

export function logoutAction() {
	return (dispatch) => {
		dispatch({
			type: LOGOUT_REQUEST,
		})
	};
}
