import axios from "axios";
import config from "../../../config/config";
import TYPES from "../types/message";
import guestbookActions from "../actions/guestbook";
import messageActions from "../actions/message";

const api = config.getConfig("api");

const fetchEntries = () => (dispatch) => {
    dispatch(guestbookActions.getEntries());

    return axios.get(`${api.prefix}/${api.name.guestbook}`).then((response) => {
        dispatch(guestbookActions.entriesReceived(response));
    }, (error) => {
        dispatch(guestbookActions.entriesFailed(error));
        dispatch(messageActions.publishMessage({
            message: error,
            type: TYPES.MESSAGE_TYPES.DANGER
        }));
    })
};

const entryAdd = (entry) => (dispatch) => {
    dispatch(guestbookActions.getEntries());

    return axios.post(
        `${api.prefix}/${api.name.guestbook}`,
        entry
    ).then((response) => {
        dispatch(guestbookActions.entryUpdated(response.data));
        dispatch(messageActions.publishMessage({
            message: `Entry "${response.data.title}" added :)`,
            type: TYPES.MESSAGE_TYPES.SUCCESS
        }));
    }, (error) => {
        dispatch(guestbookActions.entriesFailed(error));
        dispatch(messageActions.publishMessage({
            message: error,
            type: TYPES.MESSAGE_TYPES.DANGER
        }));
    })
};

const entryDelete = (entryId) => (dispatch, getState) => {
    dispatch(guestbookActions.entryDelete());

    return axios.delete(
        `${api.prefix}/${api.name.guestbook}/${entryId}`
    ).then((response) => {
        // update entries
        dispatch(guestbookActions.entryDeleted(response.data[0]));
        // @TODO response object not array!
        dispatch(messageActions.publishMessage({
            message: `Entry "${response.data[0].title}" deleted.`,
            type: TYPES.MESSAGE_TYPES.SUCCESS
        }));
    }, (error) => {
        dispatch(messageActions.publishMessage({
            message: error.message,
            type: TYPES.MESSAGE_TYPES.DANGER
        }));
    })
}

export { fetchEntries, entryAdd, entryDelete }