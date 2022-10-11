import axios from 'axios'
import { Dispatch } from 'redux'
import * as actionTypes from './actionTypes'

export const getUser = (id: number): any => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await axios.get(`http://localhost:3000/user?id=${id}`)
            
            dispatch({
                type: actionTypes.GET_USER,
                data: response.data
            })
        } catch(err) {
            console.log(err)
        }
    }
}