import TYPES from "../types/guestbook";

const actions = {
    getEntries: () => {
        return {
            type: TYPES.FETCH
        }
    },

    entriesReceived: (entries) => {
        return {
            type: TYPES.FETCH_RECEIVED,
            payload: entries
        }
    },

    entriesFailed: (err) => {
        return {
            type: TYPES.FETCH_FAILED,
            payload: err
        }
    },

    entryUpdated: (entry) => {
        return {
            type: TYPES.ENTRY_UPDATED,
            payload: entry
        }
    }
};

export default actions;
