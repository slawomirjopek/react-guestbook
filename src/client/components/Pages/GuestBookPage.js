import React, { Component } from "react";
import GuestBookList from "../Guestbook/GuestBookList";
import GuestBookForm from "../Guestbook/GuestBookForm";

class GuestBookPage extends Component {
    render() {
        return (
            <div>
                <div className="pull-left">
                    <GuestBookList/>
                </div>
                <div className="pull-right">
                    <GuestBookForm/>
                </div>
            </div>
        )
    }
};

export default GuestBookPage;