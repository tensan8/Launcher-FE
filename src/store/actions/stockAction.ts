import axios from 'axios'
import { Dispatch } from 'redux'
import * as actionTypes from '../actionTypes'
//import {StockDTO} from '../../dtos/snackDTO'

export const getSnackStock = (): any => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_HOST ?? ''}/stock-order/` ?? '')

            dispatch({
                type: actionTypes.GET_SNACK_ORDER,
                data: response.data
            })
        } catch (err) {
            console.log(err)
        }
    }
}
