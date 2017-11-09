import TYPES from "../types/guestbook";
const _ = require("lodash");

const init = {
    entries: [],
    entriesTemp: [],
    loading: false,
    error: null,
    pagination: {
        page: null,
        pageTemp: null,
        pages: null
    },
    fetched: {
        home: false,
        admin: false
    }
};

const reducer = (state = init, action) => {
    switch (action.type) {
        case TYPES.FETCH:
            state = {
                ...state,
                loading: true
            };
            break;
        case TYPES.FETCH_RECEIVED: {
            let entries = _.isArray(action.payload.entries) ? action.payload.entries : action.payload;

            if (action.payload.pagination) {
                entries = state.entriesTemp.concat(action.payload.entries);
                state.entriesTemp = entries;

                if (state.fetched[action.target]) {
                    entries = state.entries.concat(action.payload.entries)
                }
            }

            state = {
                ...state,
                entries: entries,
                loading: false,
                pagination: action.payload.pagination || state.pagination,
                fetched: {
                    ...init.fetched,
                    [action.target]: true
                }
            };

            break;
        }
        case TYPES.FETCH_FAILED:
            state = {
                ...state,
                loading: false,
                error: action.payload
            };
            break;
        case TYPES.ENTRY_UPDATED:
            state = {
                ...state,
                entries: [action.payload, ...state.entries],
                entriesTemp: [action.payload, ...state.entries],
                loading: false
            };
            break;
        case TYPES.DELETE:
            state = {
                ...state,
                loading: true
            };
            break;
        case TYPES.DELETED:
            const entries = _.filter(
                state.entries, (entry) => entry._id !== action.payload._id
            );

            const entriesTemp = _.filter(
                state.entriesTemp, (entry) => entry._id !== action.payload._id
            );

            state = {
                ...state,
                entries,
                entriesTemp,
                loading: false
            };
            break;
        case TYPES.NOT_DELETED:
            state = {
                ...state,
                loading: false
            }
            break;
    }
    return state;
};

export default reducer;