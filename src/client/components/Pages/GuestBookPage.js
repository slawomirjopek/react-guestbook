import React, { Component } from "react";
import { fetchEntriesPage } from "../../effects/guestbook";
import GuestBookList from "../Guestbook/GuestBookList";
import GuestBookForm from "../Guestbook/GuestBookForm";
import { connect } from "react-redux";
import { Row, Col, Button } from "reactstrap";
import Loader from "../Loader/Loader";

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
        let showLoadMore = true;

        if (this.props.pagination.page !== null &&
            this.props.pagination.page === this.props.pagination.pages) {
            showLoadMore = false;
        }

        return (
            <Row>
                <Col xs="12" md="8">
                    {this.props.entries.length ?
                        <GuestBookList entries={this.props.entries} loading={this.props.loading}/>
                        :
                        <p>There is no guestbook entries.</p>
                    }

                    {!this.props.entries.length && this.props.loading && <Loader/>}
                    {showLoadMore &&
                        <div className="text-center">
                            <Button
                                color="primary"
                                disabled={this.props.loading}
                                onClick={this.loadMore.bind(this)}
                            >Load more</Button>
                        </div>
                    }
                </Col>
                <Col xs="12" md="4">
                    <GuestBookForm/>
                </Col>
            </Row>
        )
    }

    loadMore() {
        this.props.fetchData();
    }
}

const mapStateToProps = (state) => {
    return {
        entries: state.guestbook.entries,
        fetched: state.guestbook.fetched,
        loading: state.guestbook.loading,
        pagination: state.guestbook.pagination
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => {
            dispatch(fetchEntriesPage())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(GuestBookPage);