import React, { Component } from "react";
import { connect } from "react-redux";
import { entryAdd } from "../../effects/guestbook";
import { FormGroup, Input, Button } from "reactstrap";
import FromWrapper from "../Form/Form";
const _ = require("lodash");

class GuestBookForm extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <h2 className="h4 mb-3">Leave a messsage</h2>
                <FormGroup>
                    <Input
                        name="name"
                        type="text"
                        placeholder="Your name"
                        value={this.props.formState.fields.name.value}
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        name="title"
                        type="text"
                        placeholder="Title"
                        value={this.props.formState.fields.title.value}
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        type="textarea"
                        name="content"
                        placeholder="Message"
                        value={this.props.formState.fields.content.value}
                    />
                </FormGroup>
                <Button type="submit" disabled={!this.props.formState.formValid}>Add entry</Button>
            </div>
        )
    }
}

const submitAction = (data, props) => {
    props.entryAdd({
        author: data.name,
        content: data.content,
        title: data.title
    })
};

const mapDispatchToProps = (dispatch) => {
    return {
        entryAdd: (entry) => {
            dispatch(entryAdd(entry))
        }
    }
};

const wrapped = FromWrapper(
    GuestBookForm,
    [{
        name: "name",
        rules: [
            {rule: /[0-9a-zA-Z]{6,}$/i, message: "Incorrect name"}
        ]
    },
    {
        name: "title",
        rules: [
            {rule: /[0-9a-zA-Z]{6,}$/i, message: "Incorrect title"}
        ]
    },
    {
        name: "content",
        rules: [
            {rule: /[0-9a-zA-Z]{6,}$/i, message: "Incorrect message"}
        ]
    }],
    submitAction
);

export default connect(null, mapDispatchToProps)(wrapped);
