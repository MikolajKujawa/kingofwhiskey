import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import axios from "axios";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import gameReducer from "./store/reducers/game";
import newWhiskyReducer from "./store/reducers/newWhisky";
import editWhiskyReducer from "./store/reducers/editWhisky";
import authReducer from "./store/reducers/auth";
import thunk from "redux-thunk";

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

it('renders without crashing', () => {
  const div = document.createElement('div');
    const app = (
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    );
  ReactDOM.render( app, div );
  ReactDOM.unmountComponentAtNode(div);
});
