import React, { Component } from "react";
import { FormGroup, Input, Button } from "reactstrap";
import FromWrapper from "../Form/Form";

class LoginForm extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <FormGroup>
                    <Input
                        name="login"
                        type="text"
                        placeholder="Login"
                        value={this.props.formState.fields.name}
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={this.props.formState.fields.title}
                    />
                </FormGroup>
                <Button type="submit" disabled={!this.props.formState.formValid}>Log in</Button>
            </div>
        )
    }
}

const submitAction = (data, props) => {
    // @TODO auth
};

export default FromWrapper(
    LoginForm,
    [{
        name: "login",
        rules: [
            {rule: /[0-9a-zA-Z]{6,}$/i, message: "Incorrect login"}
        ]
    },
    {
        name: "password",
        rules: [
            {rule: /[0-9a-zA-Z]{6,}$/i, message: "Incorrect password"}
        ]
    }],
    submitAction
);
