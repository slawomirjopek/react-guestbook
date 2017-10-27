import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import guestbook from "../reducers/guestbook";
import login from "../reducers/login";
import message from "../reducers/message";

const reducers = {
    guestbook,
    login,
    message
};
const store = createStore(combineReducers(reducers), applyMiddleware(logger, thunk));

export { store };