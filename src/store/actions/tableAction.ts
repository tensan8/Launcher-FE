import axios from 'axios'
import { Dispatch } from 'redux'
import * as actionTypes from '../actionTypes'
import {BookingDTO} from "../../dtos/bookingDTO";

export const bookingTable = (bookingData: BookingDTO): any => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_HOST ?? ''}/booking/` ?? '', bookingData)

      dispatch({
        type: actionTypes.BOOKING_TABLE,
        data: response.data
      })
    } catch (err) {
      console.log(err)
    }
  }
}
