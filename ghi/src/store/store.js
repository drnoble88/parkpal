import { configureStore } from '@reduxjs/toolkit'
import { parkpalApi } from './apiSlice'
import parkSearchReducer from './parkSearchSlice'
export const store = configureStore({
  reducer: {
        [parkpalApi.reducerPath]: parkpalApi.reducer,
        parkSearch: parkSearchReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(parkpalApi.middleware),

})
