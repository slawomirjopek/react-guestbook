import React, { Component } from "react";
import { connect } from "react-redux";
import { entryAdd } from "../../effects/guestbook";
import { Form, FormGroup, Input, Button } from "reactstrap";
const _ = require("lodash");

class GuestBookForm extends Component {
    constructor() {
        super();

        this.state = {
            fields: {
                name: {
                    value: "",
                    valid: false,
                    errors: []
                },
                title: {
                    value: "",
                    valid: false,
                    errors: []
                },
                content: {
                    value: "",
                    valid: false,
                    errors: []
                }
            },
            formValid: false
        }
    }

    render() {
        return (
            <Form
                onSubmit={this.submitHandler.bind(this)}
                onChange={this.changeHandler.bind(this)}
            >
                <h2 className="h4 mb-3">Leave a messsage</h2>
                <FormGroup>
                    <Input
                        name="name"
                        type="text"
                        placeholder="Your name"
                        value={this.state.name}
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        name="title"
                        type="text"
                        placeholder="Title"
                        value={this.state.title}
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        type="textarea"
                        name="content"
                        placeholder="Message"
                        value={this.state.content}
                    />
                </FormGroup>
                <Button type="submit" disabled={!this.state.formValid}>Add entry</Button>
            </Form>
        )
    }

    submitHandler(e) {
        e.preventDefault();
        const data = this.getFormData(e.target);

        if (this.state.formValid) {
            this.props.entryAdd({
                author: data.name,
                content: data.content,
                title: data.title
            })
        }
    }

    changeHandler(e) {
        const field = e.target;
        this.updateField(field.name, { value: field.value }, () => {
            this.validateField(field.name)
        });
    }

    updateField(fieldName, data, callback) {
        const currentField = { ...this.state.fields[fieldName], ...data };
        const updatedFields = { ...this.state.fields, [fieldName]: currentField };

        this.setState({ fields: updatedFields }, callback);
    }

    getFormData(form) {
        const fromData = new FormData(form);
        return {
            name: fromData.get("name"),
            content: fromData.get("content"),
            title: fromData.get("title")
        }
    }

    validateField(fieldName) {
        let valid = false;
        let errors = [];
        let value = this.state.fields[fieldName].value;

        switch (fieldName) {
            case "name":
                valid = new RegExp(/[0-9a-zA-Z]{6,}$/i).test(value);
                if (!valid) errors.push("Name to short!");
                break;
            case "title":
                valid = new RegExp(/[0-9a-zA-Z]{6,}$/i).test(value);
                if (!valid) errors.push("Title to short!");
                break;
            case "content":
                valid = new RegExp(/[0-9a-zA-Z]{2,}$/i).test(value);
                if (!valid) errors.push("Message to short!");
                break;
            default:
                break;
        }

        this.updateField(fieldName, { value, valid, errors }, () => {
            this.validateForm()
        })
    }

    validateForm() {
        const valid = _.filter(this.state.fields, { valid: false });
        this.setState({
            formValid: valid.length ? false : true
        }, () => {
            console.log(this.state)
        });
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        entryAdd: (entry) => {
            dispatch(entryAdd(entry))
        }
    }
};

export default connect(null, mapDispatchToProps)(GuestBookForm)