import React from "react";
import Navigation from "../Navigation/Navigation";
import { Container, Row, Col } from "reactstrap";

const Header = () => {
    return (
        <header>
            <Container fluid={true} className="bg-primary text-center py-3">
                <Row>
                    <Col>
                        <h1 className="text-light text-uppercase mb-0">Blog react app</h1>
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