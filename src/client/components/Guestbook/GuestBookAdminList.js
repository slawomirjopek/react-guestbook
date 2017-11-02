import React, {Component} from "react";
import { connect } from "react-redux";
import { fetchEntries, entryDelete } from "../../effects/guestbook";
import { Table } from 'reactstrap';
import Icon from "../Icon/Icon";
import Moment from 'react-moment';
import Loader from "../Loader/Loader";

class GuestbookAdminList extends Component {
    componentDidMount() {
        if (!this.props.fetched) {
            this.props.fetchData();
        }
    }

    render() {
        return (
            <div className="position-relative">
                {this.props.entries.length ?
                    <Table hover responsive>
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Date</th>
                            <th className="text-center">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.getEntries()}
                        </tbody>
                    </Table>
                    :
                    <p>There is no guestbook entries.</p>
                }

                {this.props.loading && <Loader/>}
            </div>
        )
    }

    getEntries() {
        return this.props.entries.map((entry, key) => (
            <tr key={key}>
                <td>{entry.title}</td>
                <td>{entry.author}</td>
                <td>
                    <Moment format="DD-MM-YYYY HH:mm">{entry.date}</Moment>
                </td>
                <td className="text-center">
                    <Icon
                        onClick={this.iconClickHandler.bind(this)}
                        icon="fa fa-times-circle"
                        aria-hidden={true}
                        data-id={entry._id}
                    />
                </td>
            </tr>
        ));
    }

    iconClickHandler(e) {
        const entryId = e.target.dataset.id;
        this.props.deleteEntry(entryId);
    }
}

const mapStateToProps = (state) => {
    return {
        entries: state.guestbook.entries,
        fetched: state.guestbook.fetched,
        loading: state.guestbook.loading
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch(fetchEntries()),
        deleteEntry: (entryId) => {
            dispatch(entryDelete(entryId))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(GuestbookAdminList)