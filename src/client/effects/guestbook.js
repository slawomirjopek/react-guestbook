import axios from "axios";
import config from "../../../config/config";
import guestbookActions from "../actions/guestbook";
import { dispatchError, dispatchSuccess } from "../helper/helper";

const api = config.getConfig("api");

const fetchEntries = () => (dispatch) => {
    dispatch(guestbookActions.getEntries());

    return axios.get(`${api.prefix}/${api.name.guestbook}`)
        .then(res => res.data)
        .then(data => dispatch(guestbookActions.entriesReceived(data)))
        .catch(err => {
            dispatch(guestbookActions.entriesFailed(err));
            dispatchError(err);
        })
};

const entryAdd = (entry) => (dispatch) => {
    dispatch(guestbookActions.getEntries());

    return axios.post(
        `${api.prefix}/${api.name.guestbook}`,
        entry
    )
    .then(res => res.data)
    .then(data => {
        dispatch(guestbookActions.entryUpdated(data));
        dispatchSuccess(`Entry "${data.title}" added :)`)
    })
    .catch(err => {
        dispatch(guestbookActions.entriesFailed(err));
        dispatchError(err);
    })
};

const entryDelete = (entryId) => (dispatch) => {
    dispatch(guestbookActions.entryDelete());

    return axios.delete(
        `${api.prefix}/${api.name.guestbook}/${entryId}`
    )
    .then(res => res.data)
    .then(data => {
        // update entries
        dispatch(guestbookActions.entryDeleted(data[0]));
        // @TODO response object not array!
        dispatchSuccess(`Entry "${data[0].title}" deleted.`)
    })
    .catch(err => {
        const status = err.response.status || 200;
        dispatch(guestbookActions.entryNotDeleted(status));

        if (err.response.data.message) {
            return dispatchError(err.response.data.message);
        }
        dispatchError(err);
    })
};

export { fetchEntries, entryAdd, entryDelete }