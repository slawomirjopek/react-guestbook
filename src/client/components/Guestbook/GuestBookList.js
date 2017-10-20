import React, {Component} from "react";
import { Jumbotron } from "reactstrap";

const GuestBookList = (props) => {
    const entries = props.entries.map((entry, key) => (
        <Jumbotron key={key} className="px-4 py-4">
            <header>
                <h3 className="display-4">{entry.title}</h3>
                <span className="author">{entry.author}</span>
                <span className="date">{entry.date}</span>
            </header>

            <hr className="my-2" />

            <div className="content">
                <p className="lead">{entry.content}</p>
            </div>

            <hr className="my-2" />

            <div className="tags">
                {entry.tags}
            </div>
        </Jumbotron>
    ));

    return (
        <div>
            {entries}
        </div>
    )
};

export default GuestBookList;