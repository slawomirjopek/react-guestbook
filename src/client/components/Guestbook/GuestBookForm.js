import React, { Component } from "react";
import { connect } from "react-redux";
import { entryAdd } from "../../effects/guestbook";
import { FormGroup, Input, Button } from "reactstrap";
import FormWrapper from "../Form/Form";
import InputValidator from "../Form/InputValidator";
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
                    <InputValidator
                        input={<Input name="name" type="text" placeholder="Login"/>}
                        inputState={this.props.formState.fields.name}
                    />
                </FormGroup>
                <FormGroup>
                    <InputValidator
                        input={<Input name="title" type="text" placeholder="Login"/>}
                        inputState={this.props.formState.fields.title}
                    />
                </FormGroup>
                <FormGroup>
                    <InputValidator
                        input={<Input name="content" type="text" placeholder="Login"/>}
                        inputState={this.props.formState.fields.content}
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

const wrapped = FormWrapper(
    GuestBookForm,
    [{
        name: "name",
        rules: [
            {rule: /[0-9a-zA-Z]{6,30}$/i, message: "length min:6, max:30 chars: a-Z & numbers"}
        ]
    },
    {
        name: "title",
        rules: [
            {rule: /[0-9a-zA-Z]{6,20}$/i, message: "length min:6, max:20 chars: a-Z & numbers"}
        ]
    },
    {
        name: "content",
        rules: [
            {rule: /[0-9a-zA-Z]{6,255}$/i, message: "length min:6, max:255 chars: a-Z & numbers"}
        ]
    }],
    submitAction
);

export default connect(null, mapDispatchToProps)(wrapped);
