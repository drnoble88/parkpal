import { configureStore } from '@reduxjs/toolkit'
import { parkpalApi } from './apiSlice'

export const store = configureStore({
  reducer: {
        [parkpalApi.reducerPath]: parkpalApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(parkpalApi.middleware),

})
