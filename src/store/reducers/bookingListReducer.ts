import {ActionTemplate, BookingListState} from '../../type'
import * as actionTypes from '../actionTypes'
import { BookingDayDTO } from '../../dtos/bookingdataDTO';

const initialState: BookingListState = {bookingList: []}

const bookingListReducer = (state: BookingListState = initialState, action: ActionTemplate<BookingDayDTO[]>): BookingListState => {
    switch (action.type) {
        case actionTypes.BOOKING_DATA:
            return {
                ...state,
                bookingList: action.data
            }
        default:
            return {
                ...state
            }
    }
}

export default bookingListReducer
