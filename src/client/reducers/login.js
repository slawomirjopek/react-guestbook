import TYPES from "../types/login";

const init = {
    user: null,
    error: null,
    authenticated: false,
    token: null,
    loading: false
};

const reducer = (state = init, action) => {
    switch (action.type) {
        case TYPES.REQUEST:
            state = {
                ...state,
                loading: true
            };
            break;
        case TYPES.REQUEST_SUCCESS:
            state = {
                ...state,
                user: action.payload.user,
                error: null,
                authenticated: true,
                token: action.payload.token,
                loading: false
            };
            break;
        case TYPES.REQUEST_FAILED:
            state = {
                ...state,
                error: action.payload,
                loading: false
            };
            break;
    }

    return state;
};

export default reducer;