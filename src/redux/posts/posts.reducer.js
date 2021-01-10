import {
    GET_POSTS,
    GET_POST,
    GET_TOP_POSTS,
    GET_TAG_POSTS,
    POST_ERROR
} from './posts.types';


const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
        case GET_TOP_POSTS:
        case GET_TAG_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            };
        case GET_POST:
            return {
                ...state,
                post: action.payload,
                loading: false
            };
        case POST_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        default:
            return state;
    }
}