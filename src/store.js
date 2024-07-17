import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import {
	appReduser,
	userReduser,
	usersReduser,
	postReduser,
	postsReduser,
} from "./reducers";

const reduser = combineReducers({
	app: appReduser,
	user: userReduser,
	users: usersReduser,
	post: postReduser,
	posts: postsReduser,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
	reduser,
	composeEnhancers(applyMiddleware(thunk)),
);
