import { applyMiddleware, createStore,compose } from "redux";
import { reducers } from "./reducers";
import ReduxThunk from 'redux-thunk'

// Persistant store
const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {}

const middleware = applyMiddleware(ReduxThunk);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default () => {
    const store = createStore(reducers, persistedState, composeEnhancers(middleware))

    // Update the localStorage on each dispatch
    store.subscribe(() => {
        localStorage.setItem('reduxState', JSON.stringify(store.getState()))
    });

    return store;
};