import { ActionType } from '../action-types';
import { Dispatch } from 'redux';
import { Action } from '../actions';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// interface GoogleMetrics{
//     id: string, 
//     lighthouseResult: { 
//       stackPacks: String[];
//       entities: String[];
//       fullPageScreenshot:{
//         screenshot: {
//           data: string;
//           height: number;
//           width: number;
//       }
//     }
//       timing: {
//         total: number;
//       }
//       audits: {
//         bootuptime: {
//             numericValue: number;
//         }
//         "uses-optimized-images":{
//           details:{
//               items: any;
//           }
//       }
//       }
//     },
//     loadingExperience: { 
//       metrics: {
//           CUMULATIVE_LAYOUT_SHIFT_SCORE: {
//               category: string;
//           },
//           EXPERIMENTAL_TIME_TO_FIRST_BYTE: {
//             category: string;
//           }
//           FIRST_CONTENTFUL_PAINT_MS: {
//               category: string;
//           }
//           INTERACTION_TO_NEXT_PAINT: {
//               category: string;
//           }
//           FIRST_INPUT_DELAY_MS: {
//               category: string;
//           }
//       }
//   },
// }



export const fetchUser = () => async (dispatch: Dispatch<Action>) => {
    try{
        const response  = await axios.get(`/api/current_user`);
        console.log(response)
        dispatch({
            type: ActionType.FETCH_USER,
            payload: response.data
        })
    } catch(error){
        console.log("Error fetching data")
    }
}

export const getMetric = (id: string, authData: string) => async (dispatch: Dispatch<Action>,useTypedSelector: any) => {
    try{
        console.log(authData)
        const response = await axios.get(`/api/saved_sites/${authData}/${id}`)
        dispatch({ 
            type: ActionType.GET_METRIC,
            payload: response.data
        })
    } catch(error){
        console.log("Error fetching data")
    }
}

export const listMetrics = (authData: string) => async (dispatch: Dispatch<Action>) => {
    try{
        console.log(authData)
        const response  = await axios.get(`/api/saved_sites/${authData}`);
        dispatch({
            type: ActionType.LIST_METRICS,
            payload: response.data
        })
    } catch(error){
        console.log("Error fetching data")
    }
}


export const postMetrics = (siteMetrics: any) => async (dispatch: Dispatch<Action>, useTypedSelector: any) => {
        const { auth } = useTypedSelector((state: any) => state.auth)
        const googleId = auth.googleId;
        console.log(googleId)
        try{
            const response  = await axios.post(`/api/saved_sites/add`, {...siteMetrics, googleId});
            console.log(response)
            dispatch({
                type: ActionType.POST_METRICS,
                payload: response.data
            })
            let history = useNavigate();
            history(`/`);
        } catch(error){
            console.log("Error fetching data")
        }
}

export const editMetrics = (id: string) => async (dispatch: Dispatch<Action>, useTypedSelector: any) => {
    const { auth } = useTypedSelector((state: any) => state.auth)
    try{
        const response  = await axios.patch(`/api/saved_sites/edit/${auth}/${id}`);
        dispatch({
            type: ActionType.EDIT_METRICS,
            payload: response.data
        })
    } catch(error){
        console.log("Error fetching data")
    }
}

export const deleteMetrics = (id: string) => async (dispatch: Dispatch<Action>, useTypedSelector: any) => {
    const { auth } = useTypedSelector((state: any) => state.auth)
    const googleId = auth.googleId;
    console.log(id)
    try{
        await axios.delete(`/api/saved_sites/delete/${googleId}/${id}`);
        dispatch({
            type: ActionType.DELETE_METRICS,
            payload: id
        })
        let history = useNavigate();
        history(`/profile/${auth}`);
    } catch(error){
        console.log("Error fetching data")
    }
}