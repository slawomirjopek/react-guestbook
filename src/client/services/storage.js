import TYPES from "../types/storage";
const _ = require("lodash");

class Storage {
    constructor() {
        // default storage type
        this.storage = getStorage(TYPES.SESSION);
    }

    // set storage type (local or session storage)
    use(storageType) {
        if (
            !storageType ||
            typeof storageType !== "string" ||
            (storageType !== TYPES.LOCAL && storageType !== TYPES.SESSION)
        ) {
            throw new TypeError(`Storage should use: ${TYPES.SESSION} or ${TYPES.LOCAL}`);
        }

        this.storage = getStorage(storageType);
    }

    set(data) {
        if (!_.isPlainObject(data)) return;

        if (Object.keys(data).length) {
            _.forEach(data, (value, key) => this.storage.setItem(key, value));
        }
    }

    get(key) {
        if (!key || typeof key !== "string") {
            throw new TypeError(`Storage get param should be non-empty string`);
        }

        return this.storage.getItem(key);
    }

    // is exists key:value in storage
    isExists(data) {
        if (!_.isPlainObject(data)) return false;

        let exists = false;

        if (Object.keys(data).length && Object.keys(data).length < 2) {
            _.forEach(data, (value, key) => {
                if (this.get(key) === value) exists = true;
            });
        }

        return exists;
    }

    remove(key) {
        if (!key || typeof key !== "string") {
            throw new TypeError(`Storage remove param should be non-empty string`);
        }

        this.storage.removeItem(key);
    }

    clear() {
        this.storage.clear();
    }
}

const getStorage = (storageType) => {
    return window[storageType]
};

export default new Storage;