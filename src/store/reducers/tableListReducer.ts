import { ActionTemplate, TableListState } from '../../type'
import * as actionTypes from '../actionTypes'
import { TableListDTO } from '../../dtos/tableListDTO'

const initialState: TableListState = {}

const tableListReducer = (state: TableListState = initialState, action: ActionTemplate<TableListDTO[]>): TableListState => {
  switch (action.type) {
    case actionTypes.ALL_TABLE_STATUS:
      return {
        ...state,
        tableList: action.data
      }
    case actionTypes.RESET_TABLE_LIST:
      return initialState
    default:
      return {
        ...state
      }
  }
}

export default tableListReducer
