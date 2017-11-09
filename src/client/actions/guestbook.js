import TYPES from "../types/guestbook";

const actions = {
    getEntries: () => {
        return {
            type: TYPES.FETCH
        }
    },

    entriesReceived: (entries, target, pagination) => {
        return {
            type: TYPES.FETCH_RECEIVED,
            payload: entries,
            target: target,
            pagination: pagination || false
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
    },

    entryDelete: () => {
        return {
            type: TYPES.DELETE
        }
    },

    entryDeleted: (deletedEntry) => {
        return {
            type: TYPES.DELETED,
            payload: deletedEntry
        }
    },

    entryNotDeleted: (status) => {
        return {
            type: TYPES.NOT_DELETED,
            status: status
        }
    }
};

export default actions;
