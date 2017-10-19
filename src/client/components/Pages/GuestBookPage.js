import React, { Component } from "react";
import { fetchEntries } from "../../effects/guestbook";
import GuestBookList from "../Guestbook/GuestBookList";
import GuestBookForm from "../Guestbook/GuestBookForm";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";

class GuestBookPage extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        if (!this.props.fetched) {
            this.props.fetchData();
        }
    }

    render() {
        return (
            <Row>
                <Col xs="12" md="8">
                    {this.props.fetched &&
                        <GuestBookList entries={this.props.entries}/>
                    }
                </Col>
                <Col xs="12" md="4">
                    <GuestBookForm/>
                </Col>
            </Row>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        entries: state.entries,
        fetched: state.fetched
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => {
            dispatch(fetchEntries())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(GuestBookPage);