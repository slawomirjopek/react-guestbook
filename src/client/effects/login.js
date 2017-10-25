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
        dispatch(actions.requestSuccess(response));
    }, (error) => {
        dispatch(actions.requestFailed(error));
    })
};

export default requestLogin;