import { useMemo } from "react";
import Table from "@components/common/Table";
import { adminColumns, adminData } from "@/app/data";
import DeleteAction from "./table-action";

function ManagementTable() {
  const rowData = useMemo(() => {
    return adminData?.map((item, index) => ({
      serial_no: index + 1,
      name: item.name,
      email: item.email,
      phone_number: item.phone_number,
      action: <DeleteAction index={index} />,
    }));
  }, []);
  return (
    <div className="bg-white">
      <Table columns={adminColumns} data={rowData} styledHeader />
    </div>
  );
}

export default ManagementTable;
