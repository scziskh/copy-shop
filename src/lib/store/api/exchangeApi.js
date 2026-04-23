import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const exchangeApi = createApi({
  reducerPath: "exchangeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bank.gov.ua/NBUStatService/v1/statdirectory",
  }),
  endpoints: (build) => ({
    getExchange: build.query({
      query: (valcode) => `exchange?valcode=${valcode}&json`,
    }),
  }),
});

export const { useGetExchangeQuery } = exchangeApi;
