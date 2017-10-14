import React, { Component } from "react";
import { fetchEntries } from "../../effects/guestbook";
import GuestBookList from "../Guestbook/GuestBookList";
import GuestBookForm from "../Guestbook/GuestBookForm";

class GuestBookPage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.fetchData();
    }

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

    fetchData() {
        fetchEntries();
    }
}

export default GuestBookPage;