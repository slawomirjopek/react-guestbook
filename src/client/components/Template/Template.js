import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import GuestBookPage from "../Pages/GuestBookPage";
import ContactPage from "../Pages/ContactPage";
import NoRoutePage from "../Pages/NoRoutePage";
import LoginPage from "../Pages/LoginPage";
import Message from "../Message/Message";
import { Container } from "reactstrap";
import "./template.scss";

const Template = () => {
    return (
        <div className="wrapper bg-light">
            <Header/>
            <Container className="py-4">
                <Message/>
                <Switch>
                    <Route path="/" component={GuestBookPage} exact/>
                    <Route path="/contact" component={ContactPage}/>
                    <Route path="/login" component={LoginPage} />
                    <Route component={NoRoutePage}/>
                </Switch>
            </Container>
            <Footer/>
        </div>
    )
};

export default Template;