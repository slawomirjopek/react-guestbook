import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Button } from "reactstrap";
import LoginForm from "../../components/Login/LoginForm";
import GuestbookAdminList from "../../components/Guestbook/GuestbookAdminList";
import { logout } from "../../effects/login";

class LoginPage extends Component {
    render() {
        let colParams;
        if (!this.props.authenticated) {
            colParams = { xs: "12", sm: "10", md: "8", lg: "6" }
        }

        return (
            <Row>
                <Col {...colParams}>
                    <h2>Admin login</h2>
                    {this.props.authenticated ?
                        <div>
                            <p>Welcome {this.props.user.login}!</p>
                            <Button onClick={this.props.logout}>Logout</Button>
                            <br/><br/>
                            <GuestbookAdminList/>
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
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            dispatch(logout())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)


