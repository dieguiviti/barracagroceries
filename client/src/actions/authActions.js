import axios from 'axios';
// import error actions
import { RETURN_ERRORS } from './errorActions';

// import actions
import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
} from './types';

//  LOADING A USER DATA
export const LOAD_USER = () => (dispatch, getState) => {
    // send user loading to reducer
    dispatch({ type: USER_LOADING });

    // hit endpoint
    axios
        .get('/api/auth/user', HEADER_CONFIG(getState))
        .then( response => dispatch({
                type: USER_LOADED,
                payload: response.data
        }))
        .catch( error => {
            // return errors to state
            dispatch(RETURN_ERRORS( error.response.data, error.response.status ));
            dispatch({
            type: AUTH_ERROR
        });
    });
}; 

// REGISTER USER
export const REGISTER = ({name, username, email, password}) => dispatch => {
    // Headers configuration
    const CONFIG = {
        headers: {
            'Content-type': 'application/json'
        }
    };

    // Set a body to go with header
    const BODY = JSON.stringify({ name, username, email, password });

    // Make post request to server
    axios
        .post('/api/users', BODY, CONFIG)
        .then( response => dispatch({
            type: REGISTER_SUCCESS,
            payload: response.data
        }))
        .catch( error => {
            // return errors
            dispatch(RETURN_ERRORS( error.response.data, error.response.status, 'REGISTER_FAIL' ))
            // dispatch response to reducer
            dispatch({
                type: REGISTER_FAIL
            });
        });
};

// LOGIN USER
export const LOGIN = ({ username, password }) => dispatch => {
    // Header config
    const CONFIG = {
        headers: {
            'Content-type': 'application/json'
        }
    };

    // attach body to header
    const BODY = JSON.stringify({ username, password });

    // send request 
    axios
        .post('api/auth', BODY, CONFIG)
        .then( response => dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data
        }))
        .catch( error => {
            dispatch(RETURN_ERRORS(error.response.data, error.response.status, 'LOGIN_FAIL'))
            dispatch({
                type: LOGIN_FAIL
            });
        });
};


// LOGOUT USER
export const LOGOUT = () => {
    return {
        type: LOGOUT_SUCCESS
    };
};


// Config headers with token for axios request
export const HEADER_CONFIG = getState => {
    // grab token by grabbing state of auth reducer
    const TOKEN = getState().auth.token;

    // set headers for api request
    const CONFIG = {
        headers: {
            'Content-type': 'application/json'
        }
    };

    // add token to header if it is true
    if (TOKEN) { CONFIG.headers['x-auth-token'] = TOKEN; };

    // return CONFIGGED headers
    return CONFIG;
}