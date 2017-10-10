import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Template from "./components/Template/Template";

ReactDOM.render(
    <Router>
        <Template/>
    </Router>,
    document.getElementById("app")
);