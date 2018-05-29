import * as types from '../constans/index';

export function signupAction(username, password) {
	return (dispatch) => {
		dispatch({
			type: types.SIGNUP_REQUEST,
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
				 type: types.SIGNUP_SUCCESS,
				 payload: json,
			})
    })
     .catch(reason => dispatch({
				 type: types.SIGNUP_FAILURE,
				 payload: reason,
			 })
		 );
	};
}

export function loginAction(username, password) {
	return (dispatch) => {
		dispatch({
			type: types.LOGIN_REQUEST,
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
					type: types.LOGIN_SUCCESS,
					payload: json,
			 })
		 })
     .catch(reason => dispatch({
				 type: types.LOGIN_FAILURE,
				 payload: reason,
			 })
		 );
	};
}

export function logoutAction() {
	return (dispatch) => {
		dispatch({
			type: types.LOGOUT_REQUEST,
		})
	};
}


export function resieveAuth() {
	return (dispatch, getState) => {
		const { token } = getState().auth;

		if (!token) {
			dispatch({
				type: types.RESIEVE_AUTH_FAILURE,
			})
		}

		fetch('http://localhost:8000/v1/users/me', {
       headers: {
				 'Authorization': `Bearer ${token}`,
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
  		.then(json => dispatch({
  			type: types.RESIEVE_AUTH_SUCCESS,
  			payload: json,
  		}))
      .catch(reason => dispatch({
  				 type: types.RESIEVE_AUTH_FAILURE,
  				 payload: reason,
  			 })
  		);
	};
}
