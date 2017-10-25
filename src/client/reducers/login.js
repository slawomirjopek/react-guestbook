import TYPES from "../types/login";

const init = {
    login: {
        user: null,
        error: null,
        authenticated: false,
        token: null,
        loading: false
    }
};

const reducer = (state = init, action) => {
    switch (action.type) {
        case TYPES.REQUEST:
            state = {
                ...state,
                login: {
                    loading: true
                }
            };
            break;
        case TYPES.REQUEST_SUCCESS:
            state = {
                ...state,
                login: {
                    user: action.payload.user,
                    error: null,
                    authenticated: true,
                    token: action.payload.token,
                    loading: false
                }
            };
            break;
        case TYPES.REQUEST_FAILED:
            state = {
                ...state,
                login: {
                    error: action.payload,
                    loading: false
                }
            };
            break;
    }

    return state;
};

export default reducer;