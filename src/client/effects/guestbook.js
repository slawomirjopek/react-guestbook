import axios from "axios";
import config from "../../../config/config";
import guestbookActions from "../actions/guestbook";
import { dispatchError, dispatchSuccess } from "../helper/helper";

const api = config.getConfig("api");

const fetchEntries = (target) => (dispatch) => {
    dispatch(guestbookActions.getEntries());

    return axios.get(`${api.prefix}/${api.name.guestbook}`)
        .then(res => res.data)
        .then(data => dispatch(guestbookActions.entriesReceived(data, target)))
        .catch(err => {
            dispatch(guestbookActions.entriesFailed(err));
            dispatchError(err);
        })
};

const fetchEntriesPage = (target) => (dispatch, getState) => {
    let page = getState().guestbook.pagination.page || 0;
    const temp = getState().guestbook.entriesTemp;
    const fetched = getState().guestbook.fetched[target];
    const added = getState().guestbook.added;
    const entries = getState().guestbook.entries;
    let endpoint = `page/${page+1}`;

    // if return from other view get entries from temp
    if (temp.length && !fetched) {
        const data = {
            entries: temp,
            pagination: { ...getState().guestbook.pagination }
        };
        return dispatch(guestbookActions.entriesReceived(data, target, true))
    }

    if (added && entries.length > 5) {
        const entriesQty = getState().guestbook.pagination.entries;
        const rangeMin = entries.length;
        const rangeMax = (Math.ceil(rangeMin / 5) * 5) - (Math.ceil(added / 5) * 5) - (added % 5);
        const pageCurrent = Math.ceil(rangeMin / 5);
        const pageMax = Math.ceil((entriesQty + added) / 5);
        endpoint = `range/${rangeMin}/${rangeMax}`;

        console.log("rangeMin", rangeMin);
        console.log("rangeMax", rangeMax);
        console.log("pageCurrent", pageCurrent);
        console.log("pageMax", pageMax);

        dispatch(guestbookActions.resetCounters());
        dispatch(guestbookActions.setPage(pageCurrent, pageMax));
    }

    dispatch(guestbookActions.getEntries());

    return axios.get(`${api.prefix}/${api.name.guestbook}/${endpoint}`)
        .then(res => res.data)
        .then(data => dispatch(guestbookActions.entriesReceived(data, target, true)))
        .catch(err => {
            dispatch(guestbookActions.entriesFailed(err));
            dispatchError(err);
        })
};

const entryAdd = (entry) => (dispatch) => {
    dispatch(guestbookActions.getEntries());

    return axios.post(
        `${api.prefix}/${api.name.guestbook}`,
        entry
    )
    .then(res => res.data)
    .then(data => {
        dispatch(guestbookActions.entryUpdated(data));
        dispatchSuccess(`Entry "${data.title}" added :)`)
    })
    .catch(err => {
        dispatch(guestbookActions.entriesFailed(err));
        dispatchError(err);
    })
};

const entryDelete = (entryId) => (dispatch) => {
    dispatch(guestbookActions.entryDelete());

    return axios.delete(
        `${api.prefix}/${api.name.guestbook}/${entryId}`
    )
    .then(res => res.data)
    .then(data => {
        // update entries
        dispatch(guestbookActions.entryDeleted(data[0]));
        // @TODO response object not array!
        dispatchSuccess(`Entry "${data[0].title}" deleted.`)
    })
    .catch(err => {
        const status = err.response.status || 200;
        dispatch(guestbookActions.entryNotDeleted(status));

        if (err.response.data.message) {
            return dispatchError(err.response.data.message);
        }
        dispatchError(err);
    })
};

export { fetchEntries, fetchEntriesPage, entryAdd, entryDelete }