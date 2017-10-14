import TYPES from "../types/guestbook";

const getEntries = () => {
    return {
        type: TYPES.FETCH
    }
};

const entriesReceived = (entries) => {
    return {
        type: TYPES.FETCH_RECEIVED,
        payload: entries
    }
};

const entriesFailed = (err) => {
    return {
        type: TYPES.FETCH_FAILED,
        payload: err
    }
};

export { getEntries, entriesReceived, entriesFailed };
