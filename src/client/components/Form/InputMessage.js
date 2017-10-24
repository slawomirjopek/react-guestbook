import React from "react";
import "./InputMessage.scss";

const InputMessage = (props) => (
    <div className="validator-message text-danger">{props.messages}</div>
);

export default InputMessage;
