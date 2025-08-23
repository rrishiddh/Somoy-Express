import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice'
import authSlice from './slices/authSlice'
import parcelSlice from './slices/parcelSlice'

export const store = configureStore({
  reducer: {
    api: apiSlice.reducer,
    auth: authSlice,
    parcel: parcelSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch