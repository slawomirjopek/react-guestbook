import axios from "axios";
import config from "../../../config/config";
import loginActions from "../actions/login";
import storage from "../services/storage";
import { dispatchError, dispatchSuccess } from "../helper/helper";

const api = config.getConfig("api");

const requestLogin = (credentials) => (dispatch) => {
    dispatch(loginActions.requestLogin());

    return axios.post(
        `${api.prefix}/${api.name.authenticate}`,
        credentials
    )
    .then(res => res.data)
    .then(data => {
        // set axios to send auth with every request
        axios.defaults.headers.common['Authorization'] = data.token;

        if (!data.authenticated) {
            dispatch(loginActions.requestFailed(data.message));
            return dispatchError(data.message);
        }

        dispatch(loginActions.requestSuccess(data));
        dispatchSuccess(data.message);

        storage.set({
            token: data.token,
            _id: data.user._id,
            login: data.user.login
        })
    })
    .catch(error => dispatchError(error))
};

const logout = () => (dispatch) => {
    dispatch(loginActions.logout());
    storage.clear();

    // delete axios auth header
    delete axios.defaults.headers.common['Authorization'];
    dispatchSuccess("You have been logged out.")
};

export { requestLogin, logout };