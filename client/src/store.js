// REDUX STORE ENTRY POINT

// IMPORT
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';  // By refering the reducers directory, the file looks for index.js in ./reducers by default

// Representation of initial state
const initialState = {};

// Declaration of a middleware variable that stores an array of the used middleware, in this case just thunk
const middleware = [thunk];

// Store variable
// const store = createStore( 
//     rootReducer, 
//     initialState, 
//     compose(
//         applyMiddleware(...middleware),
//         window._REDUX_DEVTOOLS_EXTENSION_COMPOSE && window._REDUX_DEVTOOLS_EXTENSION_COMPOSE()
//     )
// );

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(...middleware),
  // other store enhancers if any
);
const store = createStore(rootReducer, initialState, enhancer);



export default store;

