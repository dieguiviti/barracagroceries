import { GET_ERRORS, CLEAR_ERRORS } from './types';

// Return errors to reducer
export const RETURN_ERRORS = ( message, status, id = null ) => {
    return {
        type: GET_ERRORS,
        payload: { message, status, id }
    };
};

// Clear errors from reducer
export const CLEAR = () => {
    return {
        type: CLEAR_ERRORS
    };
};