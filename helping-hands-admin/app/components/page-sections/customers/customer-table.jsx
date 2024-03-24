import { useMemo } from "react";
import Table from "@components/common/Table";
import { customerColumns, customerData } from "@/app/data";
import { boldText, formatStatusOrder } from "../../common/table-items";

function CustomerTable() {
  const rowData = useMemo(() => {
    return customerData?.map((item, index) => ({
      order_id: item.order_id,
      date: item.date,
      pickup_location: item.pickup_location,
      delivery_location: item.delivery_location,
      amount: boldText(item.amount),
    }));
  }, []);
  return (
    <div className="bg-white">
      <Table columns={customerColumns} data={rowData} styledHeader />
    </div>
  );
}

export default CustomerTable;
