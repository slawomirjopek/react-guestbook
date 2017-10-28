import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import loginActions from "./actions/login";
import Template from "./components/Template/Template";
import 'bootstrap/dist/css/bootstrap.css';

// check data from sessionStorage
const token = sessionStorage.getItem("token");
if (token) {
    const data = {
        authenticated: true,
        token,
        user: {
            _id: sessionStorage.getItem("_id"),
            login: sessionStorage.getItem("login")
        }
    };
    store.dispatch(loginActions.requestSuccess(data))
}

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Template/>
        </Router>
    </Provider>,
    document.getElementById("app")
);