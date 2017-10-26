import React, { Component } from "react";
import { connect } from "react-redux";
import { Alert } from 'reactstrap';
import messageActions from "../../actions/message";
import config from "../../../../config/config";
const _ = require("lodash");

class Message extends Component {
    componentWillReceiveProps(nextProps) {
        const length = nextProps.messages.length;
        if (!length) return;

        // if message already exists break
        const isExist = _.find(
            this.props.messages,
            { id: nextProps.messages[nextProps.messages.length - 1].id}
        );

        if (!_.isUndefined(isExist)) return;

        // remove message
        this.removeFirstMessage();
    }

    render() {
        const messages = this.props.messages.map((message, key) => {
            return <Alert color={message.type} key={key}>{message.message}</Alert>
        });

        return (
            <div className="messages-container">
                {messages}
            </div>
        )
    }

    removeFirstMessage() {
        setTimeout(() => {
            this.props.removeFirstMessage();
        }, config.getConfig("message").timeout)
    }
}

const mapStateToProps = (state) => {
    return {
        messages: state.message.messages
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeFirstMessage: () => {
            dispatch(messageActions.removeFirstMessage());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Message);

