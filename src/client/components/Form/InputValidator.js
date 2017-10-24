import React, { Component } from "react";
import InputMessage from "./InputMessage";

class InputValidator extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const inputProps = {
            autoComplete: "off"
        };

        if (!this.props.inputState.valid && !this.props.inputState.pristine) {
            inputProps.className = "is-invalid";
        }

        const input = React.cloneElement(this.props.input, inputProps);

        return (
            <div className="validator-field">
                {input}
                <InputMessage messages={this.props.inputState.errors}/>
            </div>
        )
    }
}

export default InputValidator;
