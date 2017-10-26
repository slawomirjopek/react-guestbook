import axios from "axios";
import loginActions from "../actions/login";
import { publishMessage } from "../effects/message";
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
            dispatch(publishMessage({
                message: data.message,
                type: TYPES.MESSAGE_TYPES.DANGER
            }));
            return;
        }

        dispatch(loginActions.requestSuccess(data));
        dispatch(publishMessage({
            message: data.message,
            type: TYPES.MESSAGE_TYPES.SUCCESS
        }));

        // @TODO save login/token to localStorage
    }, (error) => {
        dispatch(publishMessage({
            message: error,
            type: TYPES.MESSAGE_TYPES.DANGER
        }))
    })
};

export { requestLogin };