import messageActions from "../actions/message";

const publishMessage = (message) => (dispatch) => {
    dispatch(
        messageActions.publishMessage({ ...message })
    )
};

export { publishMessage }