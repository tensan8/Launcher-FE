import { combineReducers } from 'redux'
import userReducer from './reducers/userReducer'
import tableListReducer from './reducers/tableListReducer'
import snacksReducer from "./reducers/snacksReducer";
import snackOrderReducer from "./reducers/snackOrderReducer";
import orderListReducer from './reducers/orderListReducer';

export default combineReducers({
  user: userReducer,
  tableList: tableListReducer,
  snackList: snacksReducer,
  snackOrder: snackOrderReducer,
  orderList: orderListReducer
})
