import { combineReducers } from 'redux'
import * as userList from './user'

const rootReducer = combineReducers({
  ...userList
})

export default rootReducer