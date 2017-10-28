import React, { Component } from "react";
import { FormGroup, Input, Button } from "reactstrap";
import { connect } from "react-redux";
import FormWrapper from "../Form/Form";
import InputValidator from "../Form/InputValidator";
import { requestLogin } from "../../effects/login";

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
                >Login</Button>
            </div>
        )
    }
}

const submitAction = (data, props) => {
    props.requestLogin({ ...data });
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestLogin: (credentials) => {
            dispatch(requestLogin(credentials))
        }
    }
}

const wrapped = FormWrapper(
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
)

export default connect(null, mapDispatchToProps)(wrapped);
