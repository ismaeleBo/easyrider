import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:3000/api/v1/',
  }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: 'restaurants',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useSignupMutation } = api;

export default api;
