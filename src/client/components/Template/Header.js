import React from "react";
import Navigation from "../Navigation/Navigation";
import { Container, Row, Col } from "reactstrap";

const Header = () => {
    return (
        <header>
            <Container fluid={true} className="bg-primary text-center py-3">
                <Row>
                    <Col className="text-light">
                        <h1 className="text-uppercase mb-0">Guestbook</h1>
                        <span>If you were here, leave a message :)</span>
                    </Col>
                </Row>
            </Container>

            <Container>
                <Row>
                    <Col>
                        <Navigation/>
                    </Col>
                </Row>
            </Container>
        </header>
    )
};

export default Header;