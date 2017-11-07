import TYPES from "../types/guestbook";
const _ = require("lodash");

const init = {
    entries: [],
    loading: false,
    fetched: false,
    error: null,
    pagination: {
        page: null,
        pages: null
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
            let entries = action.payload;

            if (action.payload.entries) {
                entries = state.entries.concat(action.payload.entries)
            }

            state = {
                ...state,
                entries: entries,
                loading: false,
                fetched: true,
                pagination: action.payload.pagination || state.pagination
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

            state = {
                ...state,
                entries,
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