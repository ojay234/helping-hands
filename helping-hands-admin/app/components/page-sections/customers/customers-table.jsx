import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Table from "@components/common/Table";
import { customersColumns, customersData } from "@/app/data";
import DeleteAction from "./table-actions";
import { useGetCustomerDataQuery } from "@/app/api/apiSlice";
import { formatDate } from "../../common/table-items";

function CustomersTable() {
  const [pageIndex, setPageIndex] = useState(1);
  const router = useRouter();

  const { data, isLoading } = useGetCustomerDataQuery(pageIndex);

  console.log(data);

  const rowData = useMemo(() => {
    return data?.data?.map((item, index) => ({
      user_id: item.userId,
      name: item.name,
      date: formatDate(item.createdAt),
      email: item.email,
      phone_number: item.phoneNumber,
      action: <DeleteAction index={item.userId} />,
    }));
  }, [data]);

  const handleRowClick = (row) => {
    router.push(
      `/admin/customers/orders?userId=${row.user_id}&userName=${row.name}`
    );
  };

  const onPageChange = (label) => {
    setPageIndex(label);
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
      />
    </div>
  );
}

export default CustomersTable;
