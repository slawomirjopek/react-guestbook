import axios from "axios";
import actions from "../actions/guestbook";
import config from "../../../config/config";

const api = config.getConfig("api");

const fetchEntries = () => (dispatch) => {
    dispatch(actions.getEntries());
    return axios.get(`${api.prefix}/${api.name.guestbook}`).then((res) => {
        dispatch(actions.entriesReceived(res));
    }, (err) => {
        dispatch(actions.entriesFailed(err));
    })
};

const entryAdd = (entry) => (dispatch) => {
    dispatch(actions.getEntries());
    return axios.post(
        `${api.prefix}/${api.name.guestbook}`,
        entry
    ).then((res) => {
        dispatch(actions.entryUpdated(res.data));
    }, (err) => {
        dispatch(actions.entriesFailed(err));
    })
};

export { fetchEntries, entryAdd }