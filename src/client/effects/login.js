import axios from "axios";
import loginActions from "../actions/login";
import messageActions from "../actions/message";
import TYPES from "../types/message";
import config from "../../../config/config";

const api = config.getConfig("api");

const requestLogin = (credentials) => (dispatch) => {
    dispatch(loginActions.requestLogin());

    return axios.post(
        `${api.prefix}/${api.name.authenticate}`,
        credentials
    ).then((response) => {
        const data = response.data;

        if (!response.data.authenticated) {
            dispatch(loginActions.requestFailed(data.message));
            dispatchMessage(dispatch, data.message, TYPES.MESSAGE_TYPES.DANGER);
            return;
        }

        dispatch(loginActions.requestSuccess(data));
        dispatchMessage(dispatch, data.message, TYPES.MESSAGE_TYPES.SUCCESS);

        // @TODO save login/token to localStorage
    }, (error) => {
        dispatchMessage(dispatch, error, TYPES.MESSAGE_TYPES.DANGER);
    })
};

const dispatchMessage = (dispatcher, message, type) => {
    dispatcher(messageActions.publishMessage({
        message,
        type
    }));
};

export { requestLogin };