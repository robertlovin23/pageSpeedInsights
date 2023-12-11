import { combineReducers } from "redux";
import authReducer from './authReducer';
import metricsReducer from "./metricsReducer";

const reducers = combineReducers({
    auth: authReducer,
    metrics: metricsReducer
})

export default reducers;

export type RootState = ReturnType<typeof reducers>;