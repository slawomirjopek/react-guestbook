import React, { Component } from "react";
import { Form } from "reactstrap";

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
            console.log(this.state);
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
                fields = {...fields, [field]: {
                    value: "",
                    valid: false,
                    errors: []
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

        changeHandler() {
            console.log("x");
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
    }
};

export default FromWrapper;