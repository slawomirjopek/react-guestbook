import { getEntries } from "../actions/guestbook";

const fetchEntries = () => (dispatch) => {
    dispatch(getEntries());
    // @TODO fetch data, catch errors
};

export { fetchEntries }