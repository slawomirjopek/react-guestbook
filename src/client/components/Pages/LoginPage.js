import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import LoginForm from "../../components/Login/LoginForm";

class LoginPage extends Component {
    constructor(props) {
        super(props);
        // @TODO check if localStorage has {user and token} then make this.props.authenticated true
    }

    render() {
        return (
            <Row>
                <Col xs="12" sm="10" md="8" lg="6" >
                    <h2>Admin login</h2>
                    {this.props.authenticated ?
                        <p>Welcome!</p>
                        :
                        <LoginForm/>
                    }
                </Col>
            </Row>
        )
    }
}

const mapStateToProps = (state) => {
    return { ...state.login }
};

export default connect(mapStateToProps)(LoginPage)
