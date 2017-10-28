import TYPES from "../types/login";

const actions = {
    requestLogin: () => {
        return {
            type: TYPES.REQUEST
        }
    },

    requestSuccess: (data) => {
        return {
            type: TYPES.REQUEST_SUCCESS,
            payload: data
        }
    },

    requestFailed: (error) => {
        return {
            type: TYPES.REQUEST_FAILED,
            payload: error
        }
    },

    logout: () => {
        return {
            type: TYPES.LOGOUT
        }
    }
};

export default actions;