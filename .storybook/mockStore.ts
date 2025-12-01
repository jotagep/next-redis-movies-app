import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../store/rootReducer'

export const createMockStore = (preloadedState = {}, middleware = []) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false
      }).concat(middleware)
  })
}
