import React, { Component } from "react";
import { connect } from "react-redux";
import { entryAdd } from "../../effects/guestbook";
import { Form, FormGroup, Input, Button } from "reactstrap";

class GuestBookEntry extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Form onSubmit={this.submitHandler.bind(this)}>
                <h2 className="h4 mb-3">Leave a messsage</h2>
                <FormGroup>
                    <Input
                        name="name"
                        type="text"
                        placeholder="Your name"
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        name="title"
                        type="text"
                        placeholder="Title"
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        type="textarea"
                        name="content"
                        placeholder="Message"
                    />
                </FormGroup>
                <Button type="submit">Add entry</Button>
            </Form>
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