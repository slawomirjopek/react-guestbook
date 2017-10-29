import React, {Component} from "react";
import { connect } from "react-redux";
import { fetchEntries } from "../../effects/guestbook";
import { Table } from 'reactstrap';
import Icon from "../Icon/Icon";
import { Button } from 'reactstrap';

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
        const iconContainer = <Button color="danger" size="sm"/>;

        return this.props.entries.map((entry, key) => (
            <tr key={key}>
                <td>{entry.title}</td>
                <td>{entry.author}</td>
                <td>{entry.date}</td>
                <td className="text-center">
                    <Icon
                        onClick={this.deleteEntry}
                        icon="fa fa-trash-o"
                        aria={true}
                        wrapper={iconContainer}
                    />
                </td>
            </tr>
        ));
    }

    deleteEntry() {
        console.log("x");
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