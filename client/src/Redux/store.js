import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {foodRedux} from './reducer';

export const store = createStore(foodRedux, composeWithDevTools(applyMiddleware(thunk)));