export interface User {
  id: string
  _id: string
  name: string
  email: string
  phone: string
  address: string
  role: 'admin' | 'sender' | 'receiver'
  isActive: boolean
  createdAt: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  error: string | null
}

export interface StatusLog {
  status: ParcelStatus
  timestamp: string
  updatedBy: {
    _id: string
    name: string
  }
  location?: string
  note?: string
}

export type ParcelStatus = 
  | 'requested' 
  | 'approved' 
  | 'dispatched' 
  | 'in-transit' 
  | 'delivered' 
  | 'cancelled' 
  | 'returned'

export interface Parcel {
  _id: string
  trackingId: string
  sender: {
    _id: string
    name: string
    email: string
    phone: string
  }
  receiver: {
    _id: string
    name: string
    email: string
    phone: string
  }
  senderAddress: string
  receiverAddress: string
  parcelType: string
  weight: number
  description: string
  fee: number
  currentStatus: ParcelStatus
  statusLogs: StatusLog[]
  isActive: boolean
  createdAt: string
  expectedDeliveryDate?: string
}

export interface ParcelState {
  parcels: Parcel[]
  currentParcel: Parcel | null
  isLoading: boolean
  error: string | null
}

export interface ApiResponse<T> {
  success: boolean
  message?: string
  data?: T
  parcel?: T
  parcels?: T[]
  user?: T
  users?: T[]
}

export interface CreateParcelData {
  receiverEmail: string
  receiverAddress: string
  parcelType: string
  weight: number
  description: string
}

export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  phone: string
  address: string
  role: 'sender' | 'receiver'
}