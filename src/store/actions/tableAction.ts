import axios from 'axios'
import { Dispatch } from 'redux'
import * as actionTypes from '../actionTypes'

export const bookingTable = (tabledata: any): any => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_SINGLE_USER ?? ''}` ?? '', tabledata)

      dispatch({
        type: actionTypes.BOOKING_TABLE,
        data: response.data
      })
    } catch (err) {
      console.log(err)
    }
  }
}
