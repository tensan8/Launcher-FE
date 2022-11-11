import { combineReducers } from 'redux'
import userReducer from './reducers/userReducer'
import tableListReducer from './reducers/tableListReducer'

export default combineReducers({
  user: userReducer,
  tableList: tableListReducer
})
