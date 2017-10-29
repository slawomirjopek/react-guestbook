import axios from "axios";
import config from "../../../config/config";
import TYPES from "../types/message";
import loginActions from "../actions/login";
import messageActions from "../actions/message";
import storage from "../services/storage";

const api = config.getConfig("api");

const requestLogin = (credentials) => (dispatch) => {
    dispatch(loginActions.requestLogin());

    return axios.post(
        `${api.prefix}/${api.name.authenticate}`,
        credentials
    ).then((response) => {
        const data = response.data;

        // set axios to send auth with every request
        axios.defaults.headers.common['Authorization'] = data.token;

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

        storage.set({
            token: response.data.token,
            _id: response.data.user._id,
            login: response.data.user.login
        });
    }, (error) => {
        dispatch(messageActions.publishMessage({
            message: error,
            type: TYPES.MESSAGE_TYPES.DANGER
        }))
    })
}

const logout = () => (dispatch) => {
    dispatch(loginActions.logout());
    storage.clear();

    // delete axios auth header
    delete axios.defaults.headers.common['Authorization'];

    dispatch(messageActions.publishMessage({
        message: "You have been logged out.",
        type: TYPES.MESSAGE_TYPES.SUCCESS
    }));
}

export { requestLogin, logout };