import TYPES from "../types/message";

export default {
    publishMessage: (message) => {
        return {
            type: TYPES.PUBLISH,
            payload: message
        }
    },

    removeFirstMessage: () => {
        return {
            type: TYPES.REMOVE_FIRST
        }
    }
}
