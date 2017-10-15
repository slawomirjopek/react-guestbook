import axios from "axios";
import { getEntries, entriesReceived, entriesFailed } from "../actions/guestbook";
import config from "../../../config/config";

const api = config.getConfig("api");

const fetchEntries = () => (dispatch) => {
    dispatch(getEntries());
    return axios.get(`${api.prefix}/${api.name.guestbook}`).then((res) => {
        dispatch(entriesReceived(res));
    }, (err) => {
        dispatch(entriesFailed(err));
    })
};

export { fetchEntries }