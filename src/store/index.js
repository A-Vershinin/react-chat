import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from  'redux-thunk';
import loggerMiddleware from 'redux-logger'
import rootReducer from '../reducers';

export default function configureStore() {
  if (process.env.NODE_ENV === 'production') {
		return createStore (
			rootReducer,
			applyMiddleware(thunkMiddleware)
		)
	} else {
		return createStore (
			rootReducer,
			applyMiddleware(thunkMiddleware, loggerMiddleware)
		)
	}
}
