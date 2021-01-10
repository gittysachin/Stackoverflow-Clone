import axios from 'axios';
import { setAlert } from '../alert/alert.actions';
import {
    GET_TOP_POSTS,
    POST_ERROR
} from './posts.types';

//GET TOP POSTS
export const getTopPosts = () => async dispatch => {
    try {
        const res = await axios.get('https://api.stackexchange.com/2.2/questions/featured?page=19&pagesize=10&order=desc&sort=activity&site=stackoverflow');

        dispatch({
            type: GET_TOP_POSTS,
            payload: res.data.items
        });
    } catch (err) {
        dispatch(setAlert(err.message, 'danger'));

        dispatch({
            type: POST_ERROR,
            payload: { msg: err.statusText, status: err.status }
        });
    }
};

//GET TOP POSTS
export const getTopPostsByUser = id => async dispatch => {
    try {
        const res = await axios.get(`https://api.stackexchange.com/2.2/users/${id}/questions?page=1&pagesize=10&order=desc&sort=votes&site=stackoverflow`);

        dispatch({
            type: GET_TOP_POSTS,
            payload: res.data.items
        });
    } catch (err) {
        dispatch(setAlert(err.message, 'danger'));

        dispatch({
            type: POST_ERROR,
            payload: { msg: err.statusText, status: err.status }
        });
    }
};