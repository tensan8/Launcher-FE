import { combineReducers } from 'redux'
import reducer from './reducers/userReducer'

export default combineReducers({
  user: reducer
})
