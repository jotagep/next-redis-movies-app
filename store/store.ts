import { useDispatch } from 'react-redux'
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'

import rootReducer, { RootState } from './rootReducer'

const store = configureStore({
  reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
