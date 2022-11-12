import { combineReducers } from 'redux'
import userReducer from './reducers/userReducer'
import tableListReducer from './reducers/tableListReducer'
import snacksReducer from "./reducers/snacksReducer";

export default combineReducers({
  user: userReducer,
  tableList: tableListReducer,
  snackList: snacksReducer
})
