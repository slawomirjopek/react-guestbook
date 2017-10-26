import axios from "axios";
import actions from "../actions/login";
import config from "../../../config/config";

const api = config.getConfig("api");

const requestLogin = (credentials) => (dispatch) => {
    dispatch(actions.requestLogin());
    return axios.post(
        `${api.prefix}/${api.name.authenticate}`,
        credentials
    ).then((response) => {
        const data = response.data;
        if (!response.data.authenticated) {
            return dispatch(actions.requestFailed(data.message));
        }
        dispatch(actions.requestSuccess(data));
        // @TODO save login/token to localStorage
    }, (error) => {
        dispatch(actions.requestFailed({
            message: error
        }));
    })
};

export { requestLogin };