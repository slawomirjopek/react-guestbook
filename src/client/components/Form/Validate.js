import React, { Component } from "react";

class Validate extends Component {
    modifyChild(child) {
        let inputProps = {};
        let containerProps = {};

        if (!this.props.valid && !this.props.pristine) {
            inputProps.className = "is-invalid";
            containerProps.className = "error";
        }

        const input = React.cloneElement(child, inputProps);
        const container = React.createElement("div", {
            className: "has-warning"
        }, input);

        return container;
    }

    render() {
        return React.Children.map(this.props.children, this.modifyChild.bind(this));
    }
}

export default Validate;