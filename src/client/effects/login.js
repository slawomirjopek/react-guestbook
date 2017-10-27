import axios from "axios";
import config from "../../../config/config";
import TYPES from "../types/message";
import loginActions from "../actions/login";
import messageActions from "../actions/message";

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
            dispatch(messageActions.publishMessage({
                message: data.message,
                type: TYPES.MESSAGE_TYPES.DANGER
            }));
            return;
        }

        dispatch(loginActions.requestSuccess(data));
        dispatch(messageActions.publishMessage({
            message: data.message,
            type: TYPES.MESSAGE_TYPES.SUCCESS
        }));

        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("_id", response.data.user._id);
        sessionStorage.setItem("login", response.data.user.login);
    }, (error) => {
        dispatch(messageActions.publishMessage({
            message: error,
            type: TYPES.MESSAGE_TYPES.DANGER
        }))
    })
};

export { requestLogin };