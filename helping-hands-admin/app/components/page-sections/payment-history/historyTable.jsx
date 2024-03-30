import { useMemo, useState } from "react";
import Table from "@components/common/Table";
import {
  dashboardTableInfoColumn,
  historyColumns,
  historyData,
} from "@/app/data";
import { formatAmount, formatStatus } from "../../common/table-items";
import { useGetWalletHistoryQuery } from "@/app/api/apiSlice";

function HistoryTable() {
  const [pageIndex, setPageIndex] = useState(1);
  const { data, isLoading } = useGetWalletHistoryQuery(pageIndex);

  console.log(data);
  const rowData = useMemo(() => {
    return data?.data?.map((item, index) => ({
      // date: item.date,
      // name: item.name,
      description: item.description,
      status: formatStatus(item.status),
      amount: formatAmount(`${item.amount}`),
    }));
  }, [data]);
  const onPageChange = (label) => {
    setPageIndex(label);
  };
  return (
    <div className="bg-white">
      <Table
        columns={historyColumns}
        data={rowData || []}
        styledHeader
        pagination
        paginationData={data}
        onPageChange={onPageChange}
        isLoading={isLoading}
      />
    </div>
  );
}

export default HistoryTable;
