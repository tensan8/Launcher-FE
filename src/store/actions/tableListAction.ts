import axios from 'axios'
import { Dispatch } from 'redux'
import * as actionTypes from '../actionTypes'
import { TableListDTO } from '../../dtos/tableListDTO'

export const getAllTableStatus = (): any => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_HOST ?? ''}/table-list/` ?? '')

      dispatch({
        type: actionTypes.ALL_TABLE_STATUS,
        data: response.data
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export const updateTableStatus = (table: TableListDTO): any => {
  return async () => {
    try {
      await axios.put(`${process.env.REACT_APP_HOST ?? ''}/table-list/${table.tableId}` ?? '', { status: table.status })
    } catch (err) {
      console.log(err)
    }
  }
}

export const resetTableList = (): any => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: actionTypes.RESET_TABLE_LIST
    })
  }
}
