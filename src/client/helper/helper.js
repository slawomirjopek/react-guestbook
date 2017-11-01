import { store } from "../store/store";
import TYPES from "../types/message";
import messageActions from "../actions/message";

const dispatchError = (err) => {
    store.dispatch(messageActions.publishMessage({
        message: err,
        type: TYPES.MESSAGE_TYPES.DANGER
    }));
};

export { dispatchError }