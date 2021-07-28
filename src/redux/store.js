import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';


const initialState = {};
const middleWare = createSagaMiddleware();

const store = createStore(rootReducer, initialState, applyMiddleware(middleWare));

middleWare.run(rootSaga);

export default store;