import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import LoginForm from "../../components/Login/LoginForm";

const LoginPage = () => (
    <Row>
        <Col xs="12" sm="10" md="8" lg="6" >
            <h2>Admin login</h2>
            <LoginForm/>
        </Col>
    </Row>
);

export default LoginPage;