import axios from 'axios'
import { Dispatch } from 'redux'
import * as actionTypes from '../actionTypes'
import { LoginProps } from '../../type'

export const getUser = (id: number): any => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SINGLE_USER ?? ''}/${id}` ?? '')

      dispatch({
        type: actionTypes.GET_USER,
        data: response.data
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export const loginUser = (userInfo: LoginProps): any => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_SINGLE_USER ?? ''}/login` ?? '', userInfo)

      dispatch({
        type: actionTypes.LOGIN_USER,
        data: response.data
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export const registerUser = (userData: any): any => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_SINGLE_USER ?? ''}` ?? '', userData)

      dispatch({
        type: actionTypes.POST_USER,
        data: response.status
      })
    } catch (err) {
      console.log(err)
    }
  }
}
