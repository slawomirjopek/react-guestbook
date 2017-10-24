import React, { Component } from "react";
import { FormGroup, Input, Button } from "reactstrap";
import FormWrapper from "../Form/Form";
import Validate from "../Form/Validate";

class LoginForm extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <FormGroup>
                    <Validate
                        valid={this.props.formState.fields.login.valid}
                        pristine={this.props.formState.fields.login.pristine}
                    >
                        <Input
                            name="login"
                            type="text"
                            placeholder="Login"
                        />
                    </Validate>
                </FormGroup>
                <FormGroup>
                    <Validate
                        valid={this.props.formState.fields.password.valid}
                        pristine={this.props.formState.fields.password.pristine}
                    >
                        <Input
                            name="password"
                            type="password"
                            placeholder="Password"
                        />
                    </Validate>
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
