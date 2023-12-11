import { ActionType } from '../action-types';
import { Action } from '../actions';

const authReducer = (state = null, action: Action) => {
    switch(action.type){
        case ActionType.FETCH_USER:
            return action.payload || false 
        default:
            return state;
    }
}

export default authReducer;