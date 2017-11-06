import { logout } from "../effects/login.js";

const redirectMiddleware = store => next => action => {
    if (action.payload && action.payload.status === "AUTH_ERROR") {
        return store.dispatch(logout);
    }
    next(action);
};

export { redirectMiddleware }