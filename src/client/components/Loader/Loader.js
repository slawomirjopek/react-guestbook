import React, { Component } from "react";
import "./loader.scss";

const Loader = () => {
    const spinnerBody = [];

    while (spinnerBody.length < 12) {
        spinnerBody.push(<div></div>)
    }

    return (
        <div className="lds-css">
            <div className="lds-spinner">
                {spinnerBody}
            </div>
        </div>
    )
};

export default Loader;