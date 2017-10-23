import React, { Component } from "react";
import { Form, FormGroup, Input, Button } from "reactstrap";

class LoginForm extends Component {
    render() {
        return (
            <Form>
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
                <Button type="submit">Log in</Button>
            </Form>
        )
    }
}

export default LoginForm;