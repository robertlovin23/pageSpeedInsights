import { ActionType } from '../action-types';

interface FetchUserAction {
    type: ActionType.FETCH_USER;
    payload: any;
}

interface GetMetricsAction {
    type: ActionType.GET_METRIC;
    payload: any;
}

interface ListMetricsAction {
    type: ActionType.LIST_METRICS;
    payload: any;
}

interface PostMetricsAction {
    type: ActionType.POST_METRICS;
    payload: any;
}

interface DeleteMetricsAction {
    type: ActionType.DELETE_METRICS;
    payload: any;
}

interface EditMetricsAction {
    type: ActionType.EDIT_METRICS;
    payload: any;
}

export type Action = GetMetricsAction | 
ListMetricsAction | 
PostMetricsAction | 
DeleteMetricsAction | 
EditMetricsAction | 
FetchUserAction