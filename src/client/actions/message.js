import TYPES from "../types/message";

export default {
    publishMessage: (message) => {
        return {
            type: TYPES.ACTIONS.PUBLISH,
            payload: message
        }
    },

    removeFirstMessage: () => {
        return {
            type: TYPES.ACTIONS.REMOVE_FIRST
        }
    }
}
