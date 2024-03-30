import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Table from "@components/common/Table";
import { orderDetailsColumns } from "@/app/data";
import DeleteAction from "./table-action";

import { formatDate, formatStatusOrder } from "../../common/table-items";

function OrderDetailsTable({ data, isLoading }) {
  const orderDetails = data?.data;

  const rowData = useMemo(() => {
    if (!orderDetails) return []; // Return an empty array if orderDetails is not available yet

    return [
      {
        order_id: orderDetails.orderNumber,
        name: orderDetails.orderCustomer,
        date: formatDate(orderDetails.orderDate),
        pickup_location: orderDetails.orderPickupLocation.address,
        delivery_location: orderDetails.orderDeliveryLocation.address,
        status: formatStatusOrder(orderDetails.orderStatus),
        action: <DeleteAction id={orderDetails.orderId} />,
      },
    ];
  }, [orderDetails]);

  return (
    <div className="bg-white">
      <Table
        columns={orderDetailsColumns}
        data={rowData || []}
        styledHeader
        isLoading={isLoading}
      />
    </div>
  );
}

export default OrderDetailsTable;
