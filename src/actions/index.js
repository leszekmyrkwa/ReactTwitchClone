import { SIGN_IN, SIGN_OUT, CREATE_STREAM, EDIT_STREAM, FETCH_STREAM, FETCH_STREAMS, DELETE_STREAM } from "./types";
import streams from "../apis/streams";
import history from "../history";
import { withRouter } from "react-router-dom";
import { createStore } from "redux";

const signIn = (userId) => {
    
    return {
        type: SIGN_IN,
        payload: userId
    }
}

const signOut = () => {
    
    return {
        type: SIGN_OUT
    }
}

const createStream = (formValues) => {
    return async (dispatch, getState) => {
        const { userId } = getState().auth;
        const response = await streams.post('/streams', { ...formValues, userId });
        dispatch({ type: CREATE_STREAM, payload: response.data });

        history.push('/');
    }
}

const fetchStreams = () => async dispatch => {
    const response = await streams.get('/');
    dispatch({ type: FETCH_STREAMS, payload: response.data });
}

const fetchStream = (id) => async dispatch => {
    const response = await streams.get(`/streams/${id}`);
    dispatch({ type: FETCH_STREAM, payload: response.data });
}

const editStream = (id, formValues) => async dispatch => {
    const response = await streams.put(`/streams/${id}`, formValues);
    dispatch({ type: EDIT_STREAM, payload: response.data });

    history.push('/')
}

const deleteStream = (id) => async dispatch => {
    await streams.delete(`/streams/${id}`);
    dispatch({ type: DELETE_STREAM, payload: id});

    history.push('/')
}

export { signIn, signOut, createStream, fetchStream, fetchStreams, editStream, deleteStream };
export default withRouter(editStream, createStream);
