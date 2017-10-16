import React, { Component } from "react";
import { connect } from "react-redux";
import { entryAdd } from "../../effects/guestbook";

class GuestBookEntry extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <form onSubmit={this.submitHandler.bind(this)}>
                <input
                    name="name"
                    type="text"
                    placeholder="Your name"
                />
                <input
                    name="title"
                    type="text"
                    placeholder="Title"
                />
                <textarea
                    name="content"
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
        const content = fromData.get("content");
        const title = fromData.get("title");

        // @TODO validate fields, add title, categories, tags
        this.props.entryAdd({
            author: name,
            content: content,
            title: title
        })
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        entryAdd: (entry) => {
            dispatch(entryAdd(entry))
        }
    }
};

export default connect(null, mapDispatchToProps)(GuestBookEntry)