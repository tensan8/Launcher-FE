import { ActionTemplate, BookingState } from '../../type'
import * as actionTypes from '../actionTypes'
import { BookingDTO } from "../../dtos/bookingDTO";

const initialState: BookingState = {}

const tableReducer = (state: BookingState = initialState, action: ActionTemplate<BookingDTO>): BookingState => {
    switch (action.type) {
        case actionTypes.BOOKING_TABLE:
            return {
                ...state,
                booking: action.data
            }
        default:
            return {
                ...state
            }
    }
}

export default tableReducer
