import TYPES from "../types/guestbook";

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
                entries: action.payload.data,
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
                entries: state.entries.concat(action.payload),
                loading: false
            }
            break;
        case TYPES.DELETE:
            state = {
                ...state,
                loading: true
            }
            break;
        case TYPES.DELETED:
            const deletedEntry = action.payload;
            //@TODO remove deleted entry from entries state
            state = {
                ...state,
                loading: false
            }
            break;
    }
    return state;
};

export default reducer;