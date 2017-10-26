import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import Template from "./components/Template/Template";
import 'bootstrap/dist/css/bootstrap.css';

// reducers
import guestbook from "./reducers/guestbook";
import login from "./reducers/login";

const reducers = {
    guestbook,
    login
};

const store = createStore(combineReducers(reducers), applyMiddleware(logger, thunk));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Template/>
        </Router>
    </Provider>,
    document.getElementById("app")
);