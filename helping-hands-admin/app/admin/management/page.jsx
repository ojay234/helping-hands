"use client";
import { useState } from "react";
import ManagementTable from "@components/page-sections/admin-management/admin-table";
import Header from "@components/page-sections/header";
import CreateAdminForm from "./CreateAdminForm";
import CustomButton from "@/app/components/common/custom-button";
import { useGetAdminDataQuery } from "@/app/api/apiSlice";

function Management() {
  const [pageIndex, setPageIndex] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const { data, isLoading, refetch } = useGetAdminDataQuery(pageIndex);

  const onPageChange = (label) => {
    setPageIndex(label);
  };

  function showModal() {
    setModalVisible(true);
  }

  const handleCancel = () => {
    setModalVisible(false);
  };
  return (
    <section className="flex flex-col w-[92%] mx-auto gap-4 py-6">
      <Header title="Admin Management" filter={false} />
      <div className="flex justify-end">
        <CustomButton width="20%" clicked={showModal}>
          Create Admin User
        </CustomButton>
      </div>
      <div className="bg-white py-5 rounded-lg">
        <ManagementTable
          data={data}
          isLoading={isLoading}
          refetch={refetch}
          onPageChange={onPageChange}
        />
      </div>
      <CreateAdminForm
        modalVisible={modalVisible}
        onPageChange={onPageChange}
        setModalVisible={setModalVisible}
        refetch={refetch}
        showModal={showModal}
        handleCancel={handleCancel}
      />
    </section>
  );
}

export default Management;
