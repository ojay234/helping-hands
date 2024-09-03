import { useMemo, useState } from "react";
import Table from "@components/common/Table";
import { adminColumns, adminData } from "@/app/data";
import DeleteAction from "./table-action";
import { useGetAdminDataQuery } from "@/app/api/apiSlice";

function ManagementTable({ data, isLoading, refetch, onPageChange }) {
  const [pageIndex, setPageIndex] = useState(1);

  const refetchData = () => {
    refetch();
  };

  const rowData = useMemo(() => {
    return data?.data?.map((item, index) => ({
      serial_no: index + 1,
      name: item.name,
      email: item.email,
      phone_number: item.phoneNumber,
      action: <DeleteAction adminItem={item} refetch={refetchData} />,
    }));
  }, [data]);

  return (
    <div className="bg-white">
      <Table
        columns={adminColumns}
        data={rowData || []}
        styledHeader
        pagination
        paginationData={data?.meta}
        onPageChange={onPageChange}
        isLoading={isLoading}
      />
    </div>
  );
}

export default ManagementTable;
