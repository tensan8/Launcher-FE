import {ActionTemplate, GetSnackOrderState} from '../../type'
import * as actionTypes from '../actionTypes'
import { OrderListDTO } from '../../dtos/orderListDTO';

const initialState: GetSnackOrderState = {orderList: []}

const orderListReducer = (state: GetSnackOrderState = initialState, action: ActionTemplate<OrderListDTO[]>): GetSnackOrderState => {
    switch (action.type) {
        case actionTypes.GET_SNACK_ORDER:
            return {
                ...state,
                orderList: action.data
            }
        default:
            return {
                ...state
            }
    }
}

export default orderListReducer
