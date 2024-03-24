import { useMemo } from "react";
import { useRouter } from "next/navigation";
import Table from "@components/common/Table";
import { customersColumns, customersData } from "@/app/data";
import DeleteAction from "./table-actions";

function CustomersTable() {
  const router = useRouter();
  const rowData = useMemo(() => {
    return customersData?.map((item, index) => ({
      user_id: item.user_id,
      name: item.name,
      date: item.date,
      email: item.email,
      phone_number: item.phone_number,
      action: <DeleteAction index={index} />,
    }));
  }, []);

  const handleRowClick = () => {
    router.push(`/admin/customers/customer/`);
  };
  return (
    <div className="bg-white">
      <Table
        columns={customersColumns}
        data={rowData}
        styledHeader
        onRowClick={handleRowClick}
      />
    </div>
  );
}

export default CustomersTable;
