import { useMemo } from "react";
import Table from "@components/common/Table";
import { orderColumns, orderData } from "@/app/data";
import { deleteAction, formatStatusOrder } from "../../common/table-items";
import DeleteAction from "./table-action";

function OrderTable() {
  const rowData = useMemo(() => {
    return orderData?.map((item, index) => ({
      order_id: item.order_id,
      name: item.name,
      date: item.date,
      pickup_location: item.pickup_location,
      delivery_location: item.delivery_location,
      status: formatStatusOrder(item.status),
      action: <DeleteAction index={index} />,
    }));
  }, []);
  return (
    <div className="bg-white">
      <Table columns={orderColumns} data={rowData} styledHeader />
    </div>
  );
}

export default OrderTable;
