import TYPES from "../types/message";

const init = {
    messages: []
};

const reducer = (state = init, action) => {
    switch (action.type) {
        case TYPES.ACTIONS.PUBLISH: {
            const messages = [ ...state.messages ];
            const id = Math.random().toString(36).slice(2);

            messages.push({ ...action.payload, id });

            state = { ...state, messages: messages };
            break;
        }
        case TYPES.ACTIONS.REMOVE_FIRST: {
            const messages = [ ...state.messages ];
            messages.shift();

            state = { ...state, messages: messages };
            break;
        }
    }

    return state;
};

export default reducer;