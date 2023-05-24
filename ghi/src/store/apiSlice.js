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
      transformResponse: (response) => response?.account|| null
    }),
  }),
});

export const { useGetAccountQuery } = parkpalApi;
