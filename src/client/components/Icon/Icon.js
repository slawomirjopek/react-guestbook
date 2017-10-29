import React from "react";
import "font-awesome/css/font-awesome.css";

class Icon extends React.Component {
    render() {
        const className = `fa ${this.props.icon}`;
        return (
            <i
                onClick={this.props.onClick}
                className={className}
                aria-hidden={this.props.aria}
            />
        )
    }
}

export default Icon;