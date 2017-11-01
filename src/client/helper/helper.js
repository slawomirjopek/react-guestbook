import { store } from "../store/store";
import TYPES from "../types/message";
import messageActions from "../actions/message";

const dispatchError = (message) => {
    store.dispatch(messageActions.publishMessage({
        message: message,
        type: TYPES.MESSAGE_TYPES.DANGER
    }));
};

const dispatchSuccess = (message) => {
    store.dispatch(messageActions.publishMessage({
        message: message,
        type: TYPES.MESSAGE_TYPES.SUCCESS
    }));
};

export { dispatchError, dispatchSuccess }