import React, { Component } from "react";

class GuestBookEntry extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <form onSubmit={this.submitHandler}>
                <input
                    name="name"
                    type="text"
                    placeholder="Your name"
                />
                <textarea
                    name="entry"
                    placeholder="Entry content..."
                />
                <button type="submit">Add entry</button>
            </form>
        )
    }

    submitHandler(e) {
        e.preventDefault();
        const fromData = new FormData(e.target);
        const name = fromData.get("name");
        const entry = fromData.get("entry");
    }
}

export default GuestBookEntry;