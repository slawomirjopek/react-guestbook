import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Button } from "reactstrap";
import LoginForm from "../../components/Login/LoginForm";
import { logout } from "../../effects/login";

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
                        <div>
                            <p>Welcome {this.props.user.login}!</p>
                            <hr/>
                            <Button onClick={this.props.logout}>Logout</Button>
                        </div>
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
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            dispatch(logout())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)


