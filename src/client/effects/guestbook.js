import axios from "axios";
import config from "../../../config/config";
import TYPES from "../types/message";
import guestbookActions from "../actions/guestbook";
import messageActions from "../actions/message";

const api = config.getConfig("api");

const fetchEntries = () => (dispatch) => {
    dispatch(guestbookActions.getEntries());

    return axios.get(`${api.prefix}/${api.name.guestbook}`)
        .then(res => res.data)
        .then(data => dispatch(guestbookActions.entriesReceived(data)))
        .catch(err => {
            dispatch(guestbookActions.entriesFailed(err));
            dispatch(messageActions.publishMessage({
                message: err,
                type: TYPES.MESSAGE_TYPES.DANGER
            }));
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
        dispatch(messageActions.publishMessage({
            message: `Entry "${data.title}" added :)`,
            type: TYPES.MESSAGE_TYPES.SUCCESS
        }));
    })
    .catch(err => {
        dispatch(guestbookActions.entriesFailed(err));
        dispatch(messageActions.publishMessage({
            message: err,
            type: TYPES.MESSAGE_TYPES.DANGER
        }));
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
        dispatch(messageActions.publishMessage({
            message: `Entry "${data[0].title}" deleted.`,
            type: TYPES.MESSAGE_TYPES.SUCCESS
        }));
    })
    .catch(err => {
        dispatch(messageActions.publishMessage({
            message: err,
            type: TYPES.MESSAGE_TYPES.DANGER
        }));
    })
};

export { fetchEntries, entryAdd, entryDelete }