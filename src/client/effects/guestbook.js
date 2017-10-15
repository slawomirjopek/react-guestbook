import axios from "axios";
import { getEntries, entriesReceived, entriesFailed } from "../actions/guestbook";

const fetchEntries = () => (dispatch) => {
    dispatch(getEntries());
    axios.get("localhost:5900/guestbook").then((res) => {
        dispatch(entriesReceived(res));
    }, (err) => {
        dispatch(entriesFailed(err));
    })
};

export { fetchEntries }