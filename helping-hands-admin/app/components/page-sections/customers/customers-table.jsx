import { useMemo } from "react";
import { useRouter } from "next/navigation";
import Table from "@components/common/Table";
import { customersColumns } from "@/app/data";
import DeleteAction from "./table-actions";
import { formatDate } from "../../common/table-items";
import { useAppQueryState } from "@/app/hooks/useAppQueryState";

function CustomersTable({ data, isLoading, onPageChange, refetchData }) {
  const router = useRouter();
  const { customerPageIndex } = useAppQueryState();

  const rowData = useMemo(() => {
    return data?.data?.map((item, index) => ({
      user_id: item.userId,
      name: item.name,
      date: formatDate(item.createdAt),
      email: item.email,
      phone_number: item.phoneNumber,
      action: <DeleteAction id={item.userId} refetchData={refetchData} />,
    }));
  }, [data]);

  const handleCellClick = (cell, event) => {
    if (cell.Header === "Action") {
      event.stopPropagation();
    }
  };

  const handleRowClick = (row) => {
    router.push(
      `/admin/customers/orders?userId=${row.user_id}&userName=${row.name}&customerPage=${customerPageIndex}`
    );
  };

  return (
    <div className="bg-white">
      <Table
        columns={customersColumns}
        data={rowData || []}
        styledHeader
        onRowClick={handleRowClick}
        pagination
        paginationData={data?.meta}
        onPageChange={onPageChange}
        isLoading={isLoading}
        onCellClick={handleCellClick}
      />
    </div>
  );
}

export default CustomersTable;
