import TYPES from "../types/guestbook";
const _ = require("lodash");

const init = {
    entries: [],
    loading: false,
    fetched: false,
    error: null
};

const reducer = (state = init, action) => {
    switch (action.type) {
        case TYPES.FETCH:
            state = {
                ...state,
                loading: true
            };
            break;
        case TYPES.FETCH_RECEIVED:
            state = {
                ...state,
                entries: action.payload,
                loading: false,
                fetched: true
            };
            break;
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
    }
    return state;
};

export default reducer;