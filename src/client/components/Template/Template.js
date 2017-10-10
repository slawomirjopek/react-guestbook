import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import GuestBookPage from "../Pages/GuestBookPage";
import ContactPage from "../Pages/ContactPage";
import NoRoutePage from "../Pages/NoRoutePage";

const Template = () => {
    return (
        <div>
            <Header/>
            <main>
                <Switch>
                    <Route path="/" component={GuestBookPage} exact/>
                    <Route path="/contact" component={ContactPage}/>
                    <Route component={NoRoutePage}/>
                </Switch>
            </main>
            <Footer/>
        </div>
    )
};

export default Template;