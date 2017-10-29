import React from "react";
import "font-awesome/css/font-awesome.css";

class Icon extends React.Component {
    render() {
        const className = `fa ${this.props.icon}`;
        let wrapper;
        let icon = <i
            onClick={this.props.wrapper ? null : this.props.onClick}
            className={className}
            {...this.props}
        />

        if (this.props.wrapper) {
            wrapper = React.createElement(
                this.props.wrapper.type,
                { ...this.props.wrapper.props, onClick: this.props.onClick },
                icon
            )
        }

        return (
            <span className="icon">
                {wrapper ? wrapper : icon}
            </span>
        )
    }
}

export default Icon;