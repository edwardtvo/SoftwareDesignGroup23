import axios from 'axios'
import { UPDATE_USER } from '../constant/action-types'

export const updateUser = () => async dispatch => 
{
    console.log('inside updateUser Redux action');
    const res = axios.get('http://localhost:4000/current_user')

    try {
        dispatch({
            type: UPDATE_USER,
            payload: res.data
        })
    } catch(err) {
        dispatch({
            type: UPDATE_USER,
            payload: err
        })
    }
}