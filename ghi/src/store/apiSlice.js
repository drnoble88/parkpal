import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const parkpalApi = createApi({
  reducerPath: "parkpalApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_HOST}`,
  }),
  endpoints: (builder) => ({
    getAccount: builder.query({
      query: () => ({
        url: `/token`,
        credentials: "include",
      }),
      transformResponse: (response) => response?.account || null,
      provideTags: ['Account'],
    }),
    login: builder.mutation({
      query: ({ username, password }) => {
        const body = new FormData();
        body.append('username', username);
        body.append('password', password);
        return {
          url: `/token`,
          method: 'POST',
          body,
          credentials: "include",
        };
      },
      invalidatesTags: ['Account'],
    }),
    logout: builder.mutation({
      query: () => ({
        url: `/token`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['Account'],
    }),
    signup: builder.mutation({
      query: (formData) => ({
        url: `/api/accounts`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Account'],
    }),
    trip: builder.mutation({
      query: (data) => ({
        url: `/api/trips`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAccountQuery,
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
  useTripMutation
} = parkpalApi;
