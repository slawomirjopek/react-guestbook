import React, {Component} from "react";
import Moment from 'react-moment';
import { Jumbotron, Button } from "reactstrap";
import Loader from "../Loader/Loader";
import "./guestbook-list.scss";

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
                {entry.tags.map((tag, key) =>
                    <Button key={key}
                            color="primary"
                            size="sm"
                            className="mr-1"
                            disabled
                    >{tag}</Button>
                )}
            </div>
        </Jumbotron>
    ));

    return (
        <div className="guestbook-list">
            {entries}
            {props.loading && <Loader/>}
        </div>
    )
};

export default GuestBookList;