import axios from 'axios'
import { Dispatch } from 'redux'
import * as actionTypes from '../actionTypes'

export const GetAllBookingVis = ():any =>{
    return async (dispatch:Dispatch)=>{
        try {
            const response = await axios.get(`${process.env.REACT_APP_HOST ?? ''}/booking/visualization` ?? '')
            dispatch({
                type: actionTypes.BOOKING_DATA,
                data: response.data
            })
        } catch (err) {
            console.log(err)
        }
    }
}