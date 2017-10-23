import React, { Component } from "react";
import { FormGroup, Input, Button } from "reactstrap";
const _ = require("lodash");
import FromWrapper from "../Form/Form";

class LoginForm extends Component {
    constructor() {
        super();
    }

    render() {
        console.log(this.props);
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

const submitAction = (data) => {
    console.log("submitAction test!: ", data);
};

export default FromWrapper(
    LoginForm,
    ["login", "password"],
    submitAction
);