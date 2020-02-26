// import axios http client in order to fetch data
import axios from 'axios';
// import action types
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';

// Export getItems function to itemReducer
// which returns the type of action (GET_ITEMS) as a prop value
export let getItems = () => dispatch => {
    // call dispatch callback to setItemsLoading() to run an asynchronous request
    dispatch(setItemsLoading());
    // get request with axios
    axios
        .get('/api/items') // gets items refers to 'proxy' in package.json to avoid having to write 'http://localhost:5000/api/items
        .then( res =>      // then grab the response and return a...
            dispatch({          //dispatch
                type: GET_ITEMS,    // with the type of action
                payload: res.data   // and its respective payload
            })
        )
};


// Export addItem function returning type of action and a payload prop respective to parameter 
export let addItem = item => dispatch => {
    axios
        .post('/api/items', item)
        .then( res => 
            dispatch({
                type: ADD_ITEM,
                payload: res.data
            })
        )
};


// Export deleteItem function returning its action type and a payload prop with the parameter
export let deleteItem = _id => dispatch => {
    axios
        .delete(`/api/items/${_id}`)
        .then( res =>
            dispatch({
                type: DELETE_ITEM,
                payload: _id
            })    
        )
};

export let setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    }
}


