import { store } from "../store/store";
import loginActions from "../actions/login";
import TYPES from "../types/storage";

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
        // object { key: value }
        // array of objects { key: value }

        sessionStorage.setItem("test", data);
    }

    get(key) {
        if (!key || typeof key !== "string") {
            throw new TypeError(`Storage get should be string`);
        }

        return this.storage.getItem(key);
    }

    check(data) {
        // object { key: value }
        // return boolean
    }
}

const getStorage = (storageType) => {
    return window[storageType]
};

export default new Storage;