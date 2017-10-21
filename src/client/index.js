import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import reducers from "./reducers/guestbook";
import Template from "./components/Template/Template";
import 'bootstrap/dist/css/bootstrap.css';

const store = createStore(reducers, applyMiddleware(/*logger, */thunk));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Template/>
        </Router>
    </Provider>,
    document.getElementById("app")
);