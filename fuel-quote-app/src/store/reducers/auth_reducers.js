import * as ACTION_TYPES from '../constant/action-types'

const initialState = {
    username: '',
    password: ''
}

export const AuthReducer = (state = initialState, action) => {
    switch(action.type) {
        case ACTION_TYPES.UPDATE_USER:
            return action.payload || false

        default:   
            return state
    }
}