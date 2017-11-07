import { logout } from "../effects/login.js";

const redirectMiddleware = store => next => action => {
    if (action.status === 403) {
        store.dispatch(logout());
    }
    next(action);
};

export { redirectMiddleware }