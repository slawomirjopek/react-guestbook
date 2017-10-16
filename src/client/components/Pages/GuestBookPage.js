import React, { Component } from "react";
import { fetchEntries } from "../../effects/guestbook";
import GuestBookList from "../Guestbook/GuestBookList";
import GuestBookForm from "../Guestbook/GuestBookForm";
import { connect } from "react-redux";

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
            <div>
                <div className="pull-left">
                    {this.props.fetched &&
                        <GuestBookList entries={this.props.entries}/>
                    }
                </div>
                <div className="pull-right">
                    <GuestBookForm/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        entries: state.entries.data,
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