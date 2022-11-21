import {SnackOrderDTO} from "../../dtos/snackOrderDTO";
import {Dispatch} from "redux";
import axios from "axios";
import * as actionTypes from "../actionTypes";
import {SnackOrderResponse} from "../../type";

export const newSnackOrder = (order: SnackOrderDTO[]) => {
    return async (dispatch: Dispatch) => {
        try {
            const responses: SnackOrderResponse[] = []

            for (const item of order) {
                const response = await axios.post(`${process.env.REACT_APP_HOST ?? ''}/snack-order/` ?? '', item)
                responses.push(response.data)
            }

            dispatch({
                type: actionTypes.NEW_SNACK_ORDER,
                data: responses
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const GetAllOrder = ():any =>{
    return async (dispatch:Dispatch)=>{
        try {
            const response = await axios.post(`${process.env.REACT_APP_HOST ?? ''}/snack-order/visualization` ?? '')
            dispatch({
                type: actionTypes.GET_SNACK_ORDER,
                data: response.data
            })
        } catch (err) {
            console.log(err)
        }
    }
}