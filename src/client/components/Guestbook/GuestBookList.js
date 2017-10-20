import React, {Component} from "react";
import Moment from 'react-moment';
import { Jumbotron } from "reactstrap";

const GuestBookList = (props) => {
    const entries = props.entries.map((entry, key) => (
        <Jumbotron key={key} className="px-4 py-4">
            <header>
                <h3 className="display-4">{entry.title}</h3>
                <div className="clearfix">
                    <span className="float-sm-left">{entry.author}</span>
                    <Moment className="float-sm-right d-block" format="DD-MM-YYYY HH:mm">{entry.date}</Moment>
                </div>
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