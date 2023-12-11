import { ActionType } from '../action-types';
import { Action } from '../actions';
import _ from 'lodash';

const metricsReducer = (state = {}, action: Action) => {
    switch(action.type){
        case ActionType.GET_METRIC:
            return action.payload 
        case ActionType.LIST_METRICS:
            return action.payload
        case ActionType.POST_METRICS:
            return {...state, [action.payload.id]: action.payload}
        case ActionType.DELETE_METRICS:
            return _.omit(state, [action.payload])
        default:
            return state
    }
}

export default metricsReducer;