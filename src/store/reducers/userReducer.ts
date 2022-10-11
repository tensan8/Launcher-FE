import { UserDTO } from '../../dtos/userDTO'
import { ActionTemplate, UserState } from '../../type'
import * as actionTypes from '../actionTypes'

const initialState: UserState = {
    user: {
        userId: 0,
        cardUUID: 0,
        username: '',
        password: '',
        role: ''
    }
}

const reducer = (state: UserState = initialState, action: ActionTemplate<UserDTO>): UserState  => {
    switch(action.type) {
        case actionTypes.GET_USER:
            return {
                ...state,
                user: action.data
            }
        default:
            return {
                ...state
            }
    }
}

export default reducer