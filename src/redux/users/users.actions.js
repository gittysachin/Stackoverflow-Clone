import {
    GET_USERS,
    GET_USER,
    USER_ERROR
} from './users.types';

import axios from 'axios';

// Get user
export const getUser = id => async dispatch => {
    try {
        const res = await axios.get(`https://api.stackexchange.com/2.2/users/${id}?order=desc&sort=reputation&site=stackoverflow`);
        dispatch({
            type: GET_USER,
            payload: res.data.items[0]
        });
    } catch (err) {
        console.log(err)
        dispatch({
            type: USER_ERROR,
            payload: { msg: err.statusText, status: err.status }
        });
    }
};