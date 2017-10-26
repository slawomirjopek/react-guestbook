import axios from "axios";
import actions from "../actions/guestbook";
import config from "../../../config/config";
import { publishMessage } from "../effects/message";
import TYPES from "../types/message";

const api = config.getConfig("api");

const fetchEntries = () => (dispatch) => {
    dispatch(actions.getEntries());

    return axios.get(`${api.prefix}/${api.name.guestbook}`).then((response) => {
        dispatch(actions.entriesReceived(response));
    }, (error) => {
        dispatch(actions.entriesFailed(error));
        dispatch(publishMessage({
            message: error,
            type: TYPES.MESSAGE_TYPES.DANGER
        }));
    })
};

const entryAdd = (entry) => (dispatch) => {
    dispatch(actions.getEntries());

    return axios.post(
        `${api.prefix}/${api.name.guestbook}`,
        entry
    ).then((response) => {
        dispatch(actions.entryUpdated(response.data));
        dispatch(publishMessage({
            message: `Entry "${response.data.title}" added :)`,
            type: TYPES.MESSAGE_TYPES.SUCCESS
        }));
    }, (error) => {
        dispatch(actions.entriesFailed(error));
        dispatch(publishMessage({
            message: error,
            type: TYPES.MESSAGE_TYPES.DANGER
        }));
    })
};

export { fetchEntries, entryAdd }