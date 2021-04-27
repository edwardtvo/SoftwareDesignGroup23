import { UPDATE_USER } from '../constant/action-types'
import { AuthReducer } from './auth_reducers'
import { combineReducers } from 'redux'

const initialState = {
    userInfo: {
        username: '',
        password: '',
    }
}

const rootReducer = combineReducers({
    AuthReducer
});

export default rootReducer;