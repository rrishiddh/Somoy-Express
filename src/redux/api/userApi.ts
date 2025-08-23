import { apiSlice } from './apiSlice'
import { User, ApiResponse } from '@/type'

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<ApiResponse<User[]>, { role?: string; isActive?: boolean }>({
      query: (params) => {
        const searchParams = new URLSearchParams()
        if (params.role) searchParams.append('role', params.role)
        if (params.isActive !== undefined) searchParams.append('isActive', String(params.isActive))
        
        return `/users?${searchParams.toString()}`
      },
      providesTags: ['User'],
    }),
    toggleUserStatus: builder.mutation<ApiResponse<User>, string>({
      query: (userId) => ({
        url: `/users/toggle-status/${userId}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['User'],
    }),
  }),
})

export const {
  useGetAllUsersQuery,
  useToggleUserStatusMutation,
} = userApi