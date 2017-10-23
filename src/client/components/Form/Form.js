import React, { Component } from "react";
import { Form } from "reactstrap";
const _ = require("lodash");

const FromWrapper = (WrappedComponent, fieldsState, submitAction) => {
    return class extends Component {
        constructor(props) {
            super(props);

            this.state = {
                fields: this.mapFieldsToState(),
                formValid: true
            };
        }

        render() {
            return (
                <Form
                    onSubmit={this.submitHandler.bind(this)}
                    onChange={this.changeHandler.bind(this)}
                >
                    <WrappedComponent
                        formState={this.state}
                        {...this.props}
                    />
                </Form>
            )
        }

        mapFieldsToState() {
            let fields = {};

            fieldsState.map((field) => {
                fields = {...fields, [field.name]: {
                    value: "",
                    valid: false,
                    errors: [],
                    rules: field.rules
                }}
            });

            return fields;
        }

        submitHandler(e) {
            e.preventDefault();
            const data = this.getFormData(e.target);

            if (this.state.formValid) {
                submitAction(data)
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
            let fields = {};
            const fromData = new FormData(form);

            for (let field of fromData.entries()) {
                const fieldName = field[0];
                const fieldValue = field[1];
                fields = {...fields, [fieldName]: fieldValue}
            }

            return fields;
        }

        validateField(fieldName) {
            let valid = false;
            let errors = [];
            let value = this.state.fields[fieldName].value;

            const field = this.state.fields[fieldName];

            if (field) {
                valid = new RegExp(field.rules[0].rule).test(value);
                if (!valid) errors.push(field.rules[0].message);
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
};

export default FromWrapper;