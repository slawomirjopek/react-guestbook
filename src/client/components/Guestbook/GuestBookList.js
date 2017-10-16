import React, {Component} from "react";

const GuestBookList = (props) => {
    const entries = props.entries.map((entry, key) => (
        <li key={key}>
            <header>
                <h3>{entry.title}</h3>
                <span className="author">{entry.author}</span>
                <span className="date">{entry.date}</span>
            </header>

            <div className="content">
                {entry.content}
            </div>

            <div className="tags">
                {entry.tags}
            </div>
        </li>
    ));

    return (
        <div>
            <ul>
                {entries}
            </ul>
        </div>
    )
};

export default GuestBookList;