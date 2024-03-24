
import { useMemo } from "react";
import Table from "@components/common/Table";
import {
  dasboardTableInfoData,
  dashboardTableInfoColumn,
  orderDataOne,
  orderOneColumns,
} from "@/app/data";
import { boldText, formatStatus } from "../../common/table-items";

export function DashboardOrderTable() {
  const rowData = useMemo(() => {
    return orderDataOne?.map((item, index) => ({
      order_id: item.orderId,
      name: item.name,
      status: formatStatus(item.status),
    }));
  }, []);
  return (
    <div>
      <Table columns={orderOneColumns} data={rowData} />
    </div>
  );
}

export function InfoTable() {
  const dashboardRowData = useMemo(() => {
    return dasboardTableInfoData?.map((item, index) => ({
      top_district: item.top_district,
      number_of_drop: item.number_of_drop,
      number_of_pick: item.number_of_pick,
      total_order: item.total_order,
      revenue: boldText(item.revenue),
    }));
  }, []);
  return (
    <div className="bg-white">
      <Table columns={dashboardTableInfoColumn} data={dashboardRowData} />
    </div>
  );
}
