import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import GuestBookPage from "../Pages/GuestBookPage";
import ContactPage from "../Pages/ContactPage";
import NoRoutePage from "../Pages/NoRoutePage";
import { Container } from "reactstrap";

const Template = () => {
    return (
        <div className="bg-light">
            <Header/>
            <Container className="py-4">
                <Switch>
                    <Route path="/" component={GuestBookPage} exact/>
                    <Route path="/contact" component={ContactPage}/>
                    <Route component={NoRoutePage}/>
                </Switch>
            </Container>
            <Footer/>
        </div>
    )
};

export default Template;