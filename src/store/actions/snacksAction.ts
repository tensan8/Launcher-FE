import axios from 'axios'
import { Dispatch } from 'redux'
import * as actionTypes from '../actionTypes'

export const getAllSnacks = (): any => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_HOST ?? ''}/snack/` ?? '')

            dispatch({
                type: actionTypes.ALL_SNACKS,
                data: response.data
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const updateSnack = (snackId: number, updatedData: {name?: string, currentStock?: string, price?: string}): any => {
    return async () => {
        try {
            await axios.put(`${process.env.REACT_APP_HOST ?? ''}/snack/${snackId}` ?? '', updatedData)
        } catch (err) {
            console.log(err)
        }
    }
}

export const resetSnack = (): any => {
    return async (dispatch: Dispatch) => {
        dispatch({
            type: actionTypes.RESET_SNACK
        })
    }
}
