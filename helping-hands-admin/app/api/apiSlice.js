import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { selectUser } from "@store/slice/userSlice";

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://hh.altoservices.net/api",
    prepareHeaders: (headers, { getState }) => {
      const user = selectUser(getState());
      const token = user ? user.token : localStorage.getItem("auth_token");

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
        url: `/v1/admin/dashboard?${filter}`,
        method: "GET",
      }),
    }),
    getOrderData: builder.query({
      query: ({ pageIndex, filter }) => ({
        url: `/v1/admin/orders?page=${pageIndex}${filter}`,
        method: "GET",
      }),
    }),
    DeleteOrder: builder.mutation({
      query: (id) => ({
        url: `/v1/admin/orders/${id}/delete`,
        method: "DELETE",
      }),
    }),
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `/v1/admin/orders/${id}/details`,
        method: "GET",
      }),
    }),
    getCustomerData: builder.query({
      query: ({ pageIndex, filter }) => ({
        url: `/v1/admin/customers?page=${pageIndex}${filter}`,
        method: "GET",
      }),
    }),
    getCustomerOrders: builder.query({
      query: (id) => ({
        url: `/v1/admin/customers/${id}/orders`,
        method: "GET",
      }),
    }),
    deleteCustomer: builder.mutation({
      query: (id) => ({
        url: `/v1/admin/customers/${id}/delete`,
        method: "DELETE",
      }),
    }),
    createAdminUser: builder.mutation({
      query: (body) => ({
        url: `/v1/admin/users/create`,
        method: "POST",
        body,
      }),
    }),
    getAdminData: builder.query({
      query: (pageNumber) => ({
        url: `/v1/admin/users?page=${pageNumber}`,
        method: "GET",
      }),
    }),
    adminAccess: builder.mutation({
      query: (body) => ({
        url: `/v1/admin/admins/access-revoke`,
        method: "post",
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
        url: `/v1/admin/faq?page=${pageNumber}`,
        method: "GET",
      }),
    }),
    getFaqDetails: builder.query({
      query: (id) => ({
        url: `/v1/admin/faq/${id}/view`,
        method: "GET",
      }),
    }),
    createFaq: builder.mutation({
      query: (body) => ({
        url: `/v1/admin/faq/create`,
        method: "POST",
        body,
      }),
    }),
    updateFaq: builder.mutation({
      query: ({ body, id }) => ({
        url: `/v1/admin/faq/${id}/update`,
        method: "post",
        body,
      }),
    }),
    deleteFaq: builder.mutation({
      query: (id) => ({
        url: `/v1/admin/faq/${id}/delete`,
        method: "DELETE",
      }),
    }),
    getHomeStatistic: builder.query({
      query: () => ({
        url: `/v1/business/home/statistics`,
        method: "GET",
      }),
    }),
    getDeliveryMen: builder.query({
      query: () => ({
        url: `/v1/admin/deliveryman`,
        method: "GET",
      }),
    }),
    getDeliveryMan: builder.query({
      query: () => ({
        url: `/v1/admin/deliveryman/${id}`,
        method: "GET",
      }),
    }),
    getAssignableDeliveryMan: builder.query({
      query: () => ({
        url: `/v1/admin/deliveryman/order/assignable`,
        method: "GET",
      }),
    }),
    getDeliveryManOrders: builder.query({
      query: (id) => ({
        url: `/v1/admin/deliveryman/${id}/orders`,
        method: "GET",
      }),
    }),

    createDeliveryMan: builder.mutation({
      query: (body) => ({
        url: `/v1/admin/deliveryman/create`,
        method: "POST",
        body,
      }),
    }),
    updateDeliveryMan: builder.mutation({
      query: ({ body }) => ({
        url: `/v1/admin/deliveryman/update`,
        method: "post",
        body,
      }),
    }),
    deleteDeliveryMan: builder.mutation({
      query: (id) => ({
        url: `/v1/admin/deliveryman/${id}/delete`,
        method: "DELETE",
      }),
    }),
    changeDeliveryManStatus: builder.mutation({
      query: (body) => ({
        url: `/v1/admin/deliveryman/change-status`,
        method: "post",
        body,
      }),
    }),
    assignDeliveryManOrder: builder.mutation({
      query: (body) => ({
        url: `/v1/admin/orders/assign`,
        method: "PUT",
        body,
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
  useUpdateFaqMutation,
  useDeleteFaqMutation,
  useCreateFaqMutation,
  useGetHomeStatisticQuery,
  useGetDeliveryManQuery,
  useGetDeliveryMenQuery,
  useCreateDeliveryManMutation,
  useGetDeliveryManOrdersQuery,
  useChangeDeliveryManStatusMutation,
  useGetAssignableDeliveryManQuery,
  useAssignDeliveryManOrderMutation,
  useCreateAdminUserMutation,
} = api;

export default api;
