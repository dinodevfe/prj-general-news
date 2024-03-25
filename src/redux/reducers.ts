import counterSlice from '@/app/test/_redux/counterSlice'
import { combineReducers } from '@reduxjs/toolkit'

export default combineReducers({
  counterSlice: counterSlice
})
