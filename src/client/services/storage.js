import { store } from "../store/store";
import loginActions from "../actions/login";

class Storage {
    set(data) {
        sessionStorage.setItem("test", data);
    }

    get(data) {
        // ....
    }

    check() {
        // ....
    }
}

export default new Storage;