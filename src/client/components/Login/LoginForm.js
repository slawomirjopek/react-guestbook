import React, { Component } from "react";
import { Form, FormGroup, Input, Button } from "reactstrap";
const _ = require("lodash");

class LoginForm extends Component {
    constructor() {
        super();

        this.state = {
            fields: {
                login: {
                    value: "",
                    valid: false,
                    errors: []
                },
                password: {
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
                <FormGroup>
                    <Input
                        name="login"
                        type="text"
                        placeholder="login"
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        name="password"
                        type="password"
                        placeholder="password"
                    />
                </FormGroup>
                <Button type="submit" disabled={!this.state.formValid}>Log in</Button>
            </Form>
        )
    }

    submitHandler(e) {
        e.preventDefault();
        const data = this.getFormData(e.target);

        if (this.state.formValid) {
            // login
        }
    }

    updateField(fieldName, data, callback) {
        const currentField = { ...this.state.fields[fieldName], ...data };
        const updatedFields = { ...this.state.fields, [fieldName]: currentField };

        this.setState({ fields: updatedFields }, callback);
    }

    getFormData(form) {
        const fromData = new FormData(form);
        return {
            login: fromData.get("login"),
            password: fromData.get("password")
        }
    }

    changeHandler(e) {
        const field = e.target;
        this.updateField(field.name, { value: field.value }, () => {
            this.validateField(field.name)
        });
    }

    validateField(fieldName) {
        let valid = false;
        let errors = [];
        let value = this.state.fields[fieldName].value;

        switch (fieldName) {
            case "login":
                valid = new RegExp(/[0-9a-zA-Z]{6,}$/i).test(value);
                if (!valid) errors.push("Name to short!");
                break;
            case "password":
                valid = new RegExp(/[0-9a-zA-Z]{6,}$/i).test(value);
                if (!valid) errors.push("Title to short!");
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

export default LoginForm;