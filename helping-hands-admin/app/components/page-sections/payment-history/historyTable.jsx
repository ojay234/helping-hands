import { useMemo } from "react";
import Table from "@components/common/Table";
import { historyColumns, historyData } from "@/app/data";
import { formatAmount, formatStatus } from "../../common/table-items";

function HistoryTable() {
  const rowData = useMemo(() => {
    return historyData?.map((item, index) => ({
      date: item.date,
      name: item.name,
      description: item.description,
      status: formatStatus(item.status),
      amount: formatAmount(item.amount),
    }));
  }, []);
  return (
    <div className="bg-white">
      <Table columns={historyColumns} data={rowData} styledHeader />
    </div>
  );
}

export default HistoryTable;
