import {ActionTemplate, SnackOrderResponse, SnackOrderState} from '../../type'
import * as actionTypes from '../actionTypes'

const initialState: SnackOrderState = {}

const snackOrderReducer = (state: SnackOrderState = initialState, action: ActionTemplate<SnackOrderResponse[]>): SnackOrderState => {
    switch (action.type) {
        case actionTypes.NEW_SNACK_ORDER:
            return {
                ...state,
                snackOrder: action.data
            }

        case actionTypes.GET_SNACK_ORDER:
            return {
                ...state,
                snackOrder:action.data
            }
        default:
            return state

    }
}

export default snackOrderReducer
