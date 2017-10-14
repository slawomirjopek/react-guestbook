import TYPES from "../types/guestbook";

const init = {
    entries: [],
    loading: false,
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
                loading: false
            };
            break;
        case TYPES.FETCH_FAILED:
            state = {
                ...state,
                loading: false,
                error: action.payload
            }
    }
    return state;
};

export default reducer;