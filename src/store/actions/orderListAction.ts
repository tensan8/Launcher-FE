import axios from 'axios'
import { Dispatch } from 'redux'
import * as actionTypes from '../actionTypes'

export const GetAllOrder = ():any =>{
    return async (dispatch:Dispatch)=>{
        try {
            const response = await axios.get(`${process.env.REACT_APP_HOST ?? ''}/snack-order/visualization` ?? '')
            dispatch({
                type: actionTypes.GET_SNACK_ORDER,
                data: response.data
            })
        } catch (err) {
            console.log(err)
        }
    }
}