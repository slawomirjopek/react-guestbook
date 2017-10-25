import axios from "axios";
import actions from "../actions/guestbook";
import config from "../../../config/config";

const api = config.getConfig("api");

const fetchEntries = () => (dispatch) => {
    dispatch(actions.getEntries());
    return axios.get(`${api.prefix}/${api.name.guestbook}`).then((response) => {
        dispatch(actions.entriesReceived(response));
    }, (error) => {
        dispatch(actions.entriesFailed(error));
    })
};

const entryAdd = (entry) => (dispatch) => {
    dispatch(actions.getEntries());
    return axios.post(
        `${api.prefix}/${api.name.guestbook}`,
        entry
    ).then((response) => {
        dispatch(actions.entryUpdated(response.data));
    }, (error) => {
        dispatch(actions.entriesFailed(error));
    })
};

export { fetchEntries, entryAdd }