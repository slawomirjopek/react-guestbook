import React from "react";
import { Container, Row, Col } from "reactstrap";

const Footer = () => {
    return (
        <footer className="main-footer bg-dark py-2">
            <Container fluid={true}>
                <Row>
                    <Col className="text-center">
                        <a className="text-white" href="mailto:sjopek86@gmail.com">Sławomir Jopek @ 2017</a>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
};

export default Footer;