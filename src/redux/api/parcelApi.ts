import { apiSlice } from './apiSlice'
import { CreateParcelData, Parcel, ApiResponse } from '@/type'

export const parcelApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createParcel: builder.mutation<ApiResponse<Parcel>, CreateParcelData>({
      query: (parcelData) => ({
        url: '/parcels',
        method: 'POST',
        body: parcelData,
      }),
      invalidatesTags: ['Parcel'],
    }),
    getSenderParcels: builder.query<ApiResponse<Parcel[]>, string | undefined>({
      query: (status) => ({
        url: `/parcels/my-sent${status ? `?status=${status}` : ''}`,
      }),
      providesTags: ['Parcel'],
    }),
    getReceiverParcels: builder.query<ApiResponse<Parcel[]>, string | undefined>({
      query: (status) => ({
        url: `/parcels/my-received${status ? `?status=${status}` : ''}`,
      }),
      providesTags: ['Parcel'],
    }),
    getAllParcels: builder.query<ApiResponse<Parcel[]>, string | undefined>({
      query: (status) => ({
        url: `/parcels/admin/all${status ? `?status=${status}` : ''}`,
      }),
      providesTags: ['Parcel'],
    }),
    getParcelById: builder.query<ApiResponse<Parcel>, string>({
      query: (id) => `/parcels/${id}`,
      providesTags: ['Parcel'],
    }),
    trackParcel: builder.query<ApiResponse<Parcel>, string>({
      query: (trackingId) => `/parcels/track/${trackingId}`,
    }),
    cancelParcel: builder.mutation<ApiResponse<Parcel>, string>({
      query: (id) => ({
        url: `/parcels/cancel/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Parcel'],
    }),
    confirmDelivery: builder.mutation<ApiResponse<Parcel>, string>({
      query: (id) => ({
        url: `/parcels/confirm-delivery/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Parcel'],
    }),
    updateParcelStatus: builder.mutation<
      ApiResponse<Parcel>, 
      { id: string; status: string; location?: string; note?: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/parcels/admin/update-status/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Parcel'],
    }),
  }),
})

export const {
  useCreateParcelMutation,
  useGetSenderParcelsQuery,
  useGetReceiverParcelsQuery,
  useGetAllParcelsQuery,
  useGetParcelByIdQuery,
  useTrackParcelQuery,
  useCancelParcelMutation,
  useConfirmDeliveryMutation,
  useUpdateParcelStatusMutation,
  useLazyTrackParcelQuery,
} = parcelApi