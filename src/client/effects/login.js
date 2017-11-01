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
    )
    .then(res => res.data)
    .then((data) => {
        // set axios to send auth with every request
        axios.defaults.headers.common['Authorization'] = data.token;

        if (!data.authenticated) {
            dispatch(loginActions.requestFailed(data.message));
            return dispatch(messageActions.publishMessage({
                message: data.message,
                type: TYPES.MESSAGE_TYPES.DANGER
            }));
        }

        dispatch(loginActions.requestSuccess(data));
        dispatch(messageActions.publishMessage({
            message: data.message,
            type: TYPES.MESSAGE_TYPES.SUCCESS
        }));

        storage.set({
            token: data.token,
            _id: data.user._id,
            login: data.user.login
        });
    })
    .catch(error => {
        dispatch(messageActions.publishMessage({
            message: error,
            type: TYPES.MESSAGE_TYPES.DANGER
        }))
    })
};

const logout = () => (dispatch) => {
    dispatch(loginActions.logout());
    storage.clear();

    // delete axios auth header
    delete axios.defaults.headers.common['Authorization'];

    dispatch(messageActions.publishMessage({
        message: "You have been logged out.",
        type: TYPES.MESSAGE_TYPES.SUCCESS
    }));
};

export { requestLogin, logout };