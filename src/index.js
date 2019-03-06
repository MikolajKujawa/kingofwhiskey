import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import newWhiskyReducer from './store/reducers/newWhisky';
import gameReducer from './store/reducers/game';
import editWhiskyReducer from './store/reducers/editWhisky';
import authReducer from './store/reducers/auth';

axios.defaults.baseURL = "https://kingofwhiskey-27cda.firebaseio.com"; // Default Axios URL

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
    game: gameReducer,
    newWhisky: newWhiskyReducer,
    editWhisky: editWhiskyReducer,
    auth: authReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render( app, document.getElementById('root') );

serviceWorker.unregister();
