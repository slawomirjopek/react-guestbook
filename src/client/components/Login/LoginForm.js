import React, { Component } from "react";
import { FormGroup, Input, Button } from "reactstrap";
import FormWrapper from "../Form/Form";
import InputValidator from "../Form/InputValidator";

class LoginForm extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <FormGroup>
                    <InputValidator
                        input={<Input name="login" type="text" placeholder="Login"/>}
                        inputState={this.props.formState.fields.login}
                    />
                </FormGroup>
                <FormGroup>
                    <InputValidator
                        input={<Input name="password" type="password" placeholder="Password"/>}
                        inputState={this.props.formState.fields.password}
                    />
                </FormGroup>
                <Button
                    type="submit"
                    disabled={!this.props.formState.formValid}
                >Log in</Button>
            </div>
        )
    }
}

const submitAction = (data, props) => {
    // @TODO auth
};

export default FormWrapper(
    LoginForm,
    [{
        name: "login",
        rules: [
            {rule: /[0-9a-zA-Z]{6,30}$/i, message: "length min:6, max:30 chars: a-Z & numbers"}
        ]
    },
    {
        name: "password",
        rules: [
            {rule: /[0-9a-zA-Z]{6,30}$/i, message: "length min:6, max:30 chars: a-Z & numbers"}
        ]
    }],
    submitAction
);
