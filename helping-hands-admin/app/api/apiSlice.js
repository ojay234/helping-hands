import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { selectUser } from "@store/slice/userSlice";

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://hh.altoservices.net/api",
    prepareHeaders: (headers, { getState }) => {
      const user = selectUser(getState());
      const token = user ? user.token : localStorage.getItem("auth_token");
      console.log("Token:", token);

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
    verifyPayment: builder.mutation({
      query: (intent) => ({
        url: `/payment-gateway/stripe/${intent}/verify`,
        method: "POST",
      }),
    }),
    getDashboardData: builder.query({
      query: (filter) => ({
        url: `/v1/manager/dashboard?${filter}`,
        method: "GET",
      }),
    }),
    getOrderData: builder.query({
      query: ({ pageIndex, filter }) => ({
        url: `/v1/manager/orders?page=${pageIndex}${filter}`,
        method: "GET",
      }),
    }),
    DeleteOrder: builder.mutation({
      query: (id) => ({
        url: `/v1/manager/orders/${id}/delete`,
        method: "DELETE",
      }),
    }),
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `/v1/manager/orders/${id}/details`,
        method: "GET",
      }),
    }),
    getCustomerData: builder.query({
      query: ({ pageIndex, filter }) => ({
        url: `/v1/manager/customers?page=${pageIndex}${filter}`,
        method: "GET",
      }),
    }),
    getCustomerOrders: builder.query({
      query: (id) => ({
        url: `/v1/manager/customers/${id}/orders`,
        method: "GET",
      }),
    }),
    deleteCustomer: builder.mutation({
      query: (id) => ({
        url: `/v1/manager/customers/${id}/delete`,
        method: "DELETE",
      }),
    }),
    getAdminData: builder.query({
      query: (pageNumber) => ({
        url: `/v1/manager/admins?page=${pageNumber}`,
        method: "GET",
      }),
    }),
    adminAccess: builder.mutation({
      query: (body) => ({
        url: `/v1manager/admins/access-revoke`,
        method: "PATCH",
        body,
      }),
    }),
    getBalance: builder.query({
      query: () => ({
        url: `/v1/business/wallet/balance`,
        method: "GET",
      }),
    }),
    getWalletHistory: builder.query({
      query: (pageNumber) => ({
        url: `/v1/business/wallet/history?page=${pageNumber}`,
        method: "GET",
      }),
    }),
    getFaq: builder.query({
      query: (pageNumber) => ({
        url: `/v1/manager/faq?page=${pageNumber}`,
        method: "GET",
      }),
    }),
    getFaqDetails: builder.query({
      query: (id) => ({
        url: `/v1/manager/faq/${id}/view`,
        method: "GET",
      }),
    }),
    createFaq: builder.mutation({
      query: (body) => ({
        url: `/v1/manager/faq/create`,
        method: "POST",
        body,
      }),
    }),
    getHomeStatistic: builder.query({
      query: () => ({
        url: `/v1/business/home/statistics`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useVerifyPaymentMutation,
  useGetDashboardDataQuery,
  useGetOrderDataQuery,
  useGetOrderDetailsQuery,
  useGetCustomerDataQuery,
  useDeleteOrderMutation,
  useGetCustomerOrdersQuery,
  useDeleteCustomerMutation,
  useGetAdminDataQuery,
  useAdminAccessMutation,
  useGetBalanceQuery,
  useGetWalletHistoryQuery,
  useGetFaqQuery,
  useGetFaqDetailsQuery,
  useCreateFaqMutation,
  useGetHomeStatisticQuery,
} = api;

export default api;
