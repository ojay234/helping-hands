"use client";
import { useMemo } from "react";
import Table from "@components/common/Table";
import { customerColumns, customerData } from "@/app/data";
import {
  boldText,
  formatDate,
  formatStatusOrder,
} from "../../common/table-items";

function CustomerOrderTable({ data, isLoading }) {
  const rowData = useMemo(() => {
    return data?.data?.map((item, index) => ({
      order_id: item.orderId,
      date: formatDate(item.orderDate),
      pickup_location: item.orderPickupLocation.address,
      delivery_location: item.orderDeliveryLocation.address,
      amount: boldText(item.orderCost),
    }));
  }, [data]);

  const onPageChange = (label) => {
    setPageIndex(label);
  };

  return (
    <div className="bg-white">
      <Table
        columns={customerColumns}
        data={rowData || []}
        styledHeader
        isLoading={isLoading}
        paginationData={data?.meta}
        onPageChange={onPageChange}
      />
    </div>
  );
}

export default CustomerOrderTable;
