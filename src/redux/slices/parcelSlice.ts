import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ParcelState, Parcel } from '@/type'

const initialState: ParcelState = {
  parcels: [],
  currentParcel: null,
  isLoading: false,
  error: null,
}

const parcelSlice = createSlice({
  name: 'parcel',
  initialState,
  reducers: {
    setParcels: (state, action: PayloadAction<Parcel[]>) => {
      state.parcels = action.payload
      state.error = null
    },
    setCurrentParcel: (state, action: PayloadAction<Parcel>) => {
      state.currentParcel = action.payload
      state.error = null
    },
    addParcel: (state, action: PayloadAction<Parcel>) => {
      state.parcels.unshift(action.payload)
      state.error = null
    },
    updateParcel: (state, action: PayloadAction<Parcel>) => {
      const index = state.parcels.findIndex(p => p._id === action.payload._id)
      if (index !== -1) {
        state.parcels[index] = action.payload
      }
      if (state.currentParcel && state.currentParcel._id === action.payload._id) {
        state.currentParcel = action.payload
      }
      state.error = null
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

export const { 
  setParcels, 
  setCurrentParcel, 
  addParcel, 
  updateParcel, 
  setLoading, 
  setError, 
  clearError 
} = parcelSlice.actions

export default parcelSlice.reducer