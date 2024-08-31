import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Table from "@components/common/Table";

import { formatDate, formatStatusOrder } from "../../common/table-items";
import { deliveryManOrderColumn } from "@/app/data";

function DeliveryManOrderDetailsTable({ data, isLoading }) {
  const orders = data?.data;

  const rowData = useMemo(() => {
    return orders?.map((item, index) => ({
      num: index + 1,
      id: item.orderId,
      title: item.orderTitle,
      order_number: item.orderNumber,
      cost: item.orderCost,
      date: formatDate(item.orderDate),
      status: formatStatusOrder(item.orderStatus),
    }));
  }, [orders]);

  return (
    <div className="bg-white">
      <Table
        columns={deliveryManOrderColumn}
        data={rowData || []}
        styledHeader
        isLoading={isLoading}
      />
    </div>
  );
}

export default DeliveryManOrderDetailsTable;
