import { UPDATE_USER } from '../constants/action-types'

const initialState = {
    userInfo: {
        username: '',
        password: '',
    }
}

function rootReducer(state = initialState, action) {
    if (action.type === UPDATE_USER) {
        return action.payload || false 
    }
    return state;
}

export default rootReducer;