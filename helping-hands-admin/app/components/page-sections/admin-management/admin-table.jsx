import { useMemo, useState } from "react";
import Table from "@components/common/Table";
import { adminColumns, adminData } from "@/app/data";
import DeleteAction from "./table-action";
import { useGetAdminDataQuery } from "@/app/api/apiSlice";
import CreateAdminForm from "@/app/admin/management/CreateAdminForm";

function ManagementTable({ data, isLoading, refetch, onPageChange }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [editDetails, setEditDetails] = useState(null);

  function showModal() {
    setModalVisible(true);
  }
  const handleCancel = () => {
    setEditDetails(null);
    setModalVisible(false);
  };

  const refetchData = () => {
    refetch();
  };

  const rowData = useMemo(() => {
    return data?.data?.map((item, index) => ({
      serial_no: index + 1,
      id: item.adminId,
      name: item.name,
      email: item.email,
      phone_number: item.phoneNumber,
      role: item.role,
      status: item.status,
      action: <DeleteAction adminItem={item} refetch={refetchData} />,
    }));
  }, [data]);

  const handleRowClick = (row) => {
    setEditDetails({
      adminId: row.id,
      initialValues: {
        role: row.role || "",
        name: row.name || "",
        email_address: row.email || "",
        phone_number: row.phone_number || "",
        status: row.status === 1 ? "active" : "inactive",
      },
    });
    setModalVisible(true);
  };

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
        onRowClick={handleRowClick}
      />
      <CreateAdminForm
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        refetch={refetch}
        showModal={showModal}
        handleCancel={handleCancel}
        onPageChange={onPageChange}
        editDetails={editDetails}
      />
    </div>
  );
}

export default ManagementTable;
