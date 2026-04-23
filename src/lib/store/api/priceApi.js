import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../config";

export const priceApi = createApi({
  reducerPath: "priceApi",
  baseQuery: fetchBaseQuery({ baseUrl: config.serverUrl }),
  endpoints: (build) => ({
    getPrice: build.query({ query: () => config.priceData }),
  }),
});

export const { useGetPriceQuery } = priceApi;
