import { Middleware } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'
import Reducers from './reducers'

const mids: Middleware[] = [thunk]

export const store = configureStore({
  reducer: Reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(mids)
})

export default store
