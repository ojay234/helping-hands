import { useMemo } from "react";
import Table from "@components/common/Table";
import { dashboardTableInfoColumn, orderOneColumns } from "@/app/data";
import { boldText, formatStatus } from "../../common/table-items";

export function DashboardOrderTable({ rowData, isLoading }) {
  const orderData = useMemo(() => {
    return rowData?.map((item, index) => ({
      order_id: item.orderNumber,
      name: item.customerName,
      status: formatStatus(item.orderStatus),
    }));
  }, [rowData]);
  return (
    <div>
      <Table
        columns={orderOneColumns}
        data={orderData || []}
        isLoading={isLoading}
      />
    </div>
  );
}

export function InfoTable({ rowData, isLoading }) {
  const dashboardRowData = useMemo(() => {
    return rowData?.map((item, index) => ({
      top_district: item.zoneName,
      number_of_drop: item.totalDropOff,
      number_of_pick: item.totalPickup,
      total_order: item.totalOrder,
      revenue: boldText(item.totalRevenue),
    }));
  }, [rowData]);
  return (
    <div className="bg-white">
      <Table
        columns={dashboardTableInfoColumn}
        data={dashboardRowData || []}
        isLoading={isLoading}
      />
    </div>
  );
}
