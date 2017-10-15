import React, { Component } from "react";
import { fetchEntries } from "../../effects/guestbook";
import GuestBookList from "../Guestbook/GuestBookList";
import GuestBookForm from "../Guestbook/GuestBookForm";
import { connect } from "react-redux";

class GuestBookPage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchData();
    }

    render() {
        return (
            <div>
                <div className="pull-left">
                    <GuestBookList/>
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
        entries: state.entries
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