import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {BrowserRouter} from 'react-router-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import artistReducer from './store/reducers/artist';
import commonsReducer from './store/reducers/nationality';
import testReducer from './store/reducers/test';
import authReducer from './store/reducers/auth';
import styleReducer from './store/reducers/style';
import nationalityReducer from './store/reducers/nationality';
import recordReducer from './store/reducers/record';
import formatReducer from './store/reducers/format';
import formReducer from './store/reducers/form';
import cartReducer from './store/reducers/cart';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const options = {
    // you can also just use 'bottom center'
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: '30px',
    // you can also just use 'scale'
    transition: transitions.SCALE,
  }

const rootReducer = combineReducers({
    artist: artistReducer,
    commons: commonsReducer,
    style: styleReducer,
    test: testReducer,
    auth: authReducer,
    nationality: nationalityReducer,
    record: recordReducer,
    format: formatReducer,
    form: formReducer,
    cart: cartReducer
});
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <AlertProvider template={AlertTemplate} {...options}>
                <App/>
            </AlertProvider>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
