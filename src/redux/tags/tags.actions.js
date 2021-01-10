import {
    GET_TAGS,
    TAG_ERROR
} from './tags.types';
import axios from 'axios';
import {setAlert} from "../alert/alert.actions";

export const getTags = (id) => async dispatch => {
    try {
        const res = await axios.get(`https://api.stackexchange.com/2.2/users/${id}/tags?page=1&pagesize=3&order=desc&sort=popular&site=stackoverflow`);

        dispatch({
            type: GET_TAGS,
            payload: res.data.items
        });
    } catch (err) {
        dispatch(setAlert(err.message, 'danger'));

        dispatch({
            type: TAG_ERROR,
            payload: { msg: err.statusText, status: err.status }
        });
    }
};