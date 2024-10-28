import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Table from "@components/common/Table";
import { useGetOrderDataQuery } from "@/app/api/apiSlice";
import { orderColumns } from "@/app/data";
import { formatDate, formatStatusOrder } from "../../common/table-items";
import { useAppQueryState } from "@/app/hooks/useAppQueryState";

function OrderTable({ data, isLoading, onPageChange }) {
  const { orderPageIndex } = useAppQueryState();

  const router = useRouter();

  const rowData = useMemo(() => {
    return data?.data?.map((item, index) => ({
      order_id: item.orderId,
      order_title: item.orderTitle,
      date: formatDate(item.orderDate),
      order_number: item.orderNumber,
      order_cost: item.orderCost,
    }));
  }, [data]);

  const handleRowClick = (row) => {
    router.push(
      `/admin/orders/details?orderId=${row.order_id}&orderPage=${orderPageIndex}`
    );
  };

  return (
    <div className="bg-white">
      <Table
        columns={orderColumns}
        data={rowData || []}
        styledHeader
        pagination
        paginationData={data?.meta}
        onPageChange={onPageChange}
        isLoading={isLoading}
        onRowClick={handleRowClick}
      />
    </div>
  );
}

export default OrderTable;
