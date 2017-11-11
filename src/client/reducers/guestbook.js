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
    },
    added: 0,
    deleted: 0
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
            // detect if full list / list with pagination
            let entries = _.isArray(action.payload.entries) ? action.payload.entries : action.payload;
            let entriesTemp = state.entriesTemp;

            // if pagination type transform entries
            if (action.payload.pagination) {
                // @TODO needed to detect changes if list was updated (added new/deleted)

                state.entriesTemp = entries;

                if (state.entriesTemp.length) {
                    const diff = _.difference(entriesTemp, entries);
                    state.entriesTemp = diff.concat(entries);
                }

                // if already on pagination type page set new list
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
            const added = state.added + 1;
            state = {
                ...state,
                entries: [action.payload, ...state.entries],
                entriesTemp: [action.payload, ...state.entries],
                loading: false,
                added
            };
            break;
        case TYPES.DELETE:
            state = {
                ...state,
                loading: true
            };
            break;
        case TYPES.DELETED:
            let deleted = state.deleted;

            const entries = _.filter(
                state.entries, (entry) => entry._id !== action.payload._id
            );

            const entriesTemp = _.filter(
                state.entriesTemp, (entry) => {
                    if (entry._id !== action.payload._id) return true;
                    // if deleted entry founded in temp incerse counter
                    deleted = state.deleted + 1;
                }
            );

            state = {
                ...state,
                entries,
                entriesTemp,
                loading: false,
                deleted
            };
            break;
        case TYPES.NOT_DELETED:
            state = {
                ...state,
                loading: false
            };
            break;
        case TYPES.RESET_COUNTERS:
            state = {
                ...state,
                added: 0,
                deleted: 0
            };
            break;
        case TYPES.SET_PAGE:
            state = {
                ...state,
                pagination: {
                    ...state.pagination,
                    page: action.page
                }
            };
            break;
    }
    return state;
};

export default reducer;