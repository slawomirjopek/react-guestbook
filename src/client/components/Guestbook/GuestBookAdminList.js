import React, {Component} from "react";
import { connect } from "react-redux";
import { fetchEntries } from "../../effects/guestbook";
import { Table } from 'reactstrap';
import Icon from "../Icon/Icon";

class GuestbookAdminList extends Component {
    componentDidMount() {
        if (!this.props.fetched) {
            this.props.fetchData();
        }
    }

    render() {
        return (
            <div>
                {this.props.fetched ?
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
                    <p>There is no guestbook entries</p>
                }
            </div>
        )
    }

    getEntries() {
        return this.props.entries.map((entry, key) => (
            <tr key={key}>
                <td>{entry.title}</td>
                <td>{entry.author}</td>
                <td>{entry.date}</td>
                <td className="text-center">
                    <Icon
                        onClick={this.deleteEntry}
                        icon="fa fa-times-circle"
                        aria-hidden={true}
                        data-id={entry._id}
                    />
                </td>
            </tr>
        ));
    }

    deleteEntry(e) {
        const entryId = e.target.dataset.id;
    }
}

const mapStateToProps = (state) => {
    return {
        entries: state.guestbook.entries,
        fetched: state.guestbook.fetched
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch(fetchEntries())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(GuestbookAdminList)