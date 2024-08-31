"use client";
import { useEffect, useState } from "react";
import {
  useCreateDeliveryManMutation,
  useGetDeliveryMenQuery,
} from "@/app/api/apiSlice";
import Header from "@components/page-sections/header";
import DeliveryMenTable from "@/app/components/page-sections/delivery-man/DeliveryMenTable";
import CustomButton from "@/app/components/common/custom-button";
import { deliveryManStatusCategory } from "@/app/data";
import { Formik } from "formik";
import DeliveryManForm from "./DeliveryManForm";

function DeliveryMan() {
  const [filter, setFilter] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const { data, isLoading, isError, refetch } = useGetDeliveryMenQuery({
    pageIndex,
    filter,
  });

  const handleFilter = (from, to) => {
    setFilter(`filter[date][from]=${from}&filter[date][to]=${to}`);
  };

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
      <Header title="Delivery Man" filter handleFilter={handleFilter} />
      <div className="flex justify-end">
        <CustomButton width="20%" clicked={showModal}>
          Create Delivery Man
        </CustomButton>
      </div>
      <div className="bg-white py-5 rounded-lg">
        <DeliveryMenTable
          data={data}
          isLoading={isLoading}
          onPageChange={onPageChange}
          refetch={refetch}
        />
      </div>
      <DeliveryManForm
        modalVisible={modalVisible}
        setPageIndex={setPageIndex}
        setModalVisible={setModalVisible}
        refetch={refetch}
        showModal={showModal}
        handleCancel={handleCancel}
      />
    </section>
  );
}

export default DeliveryMan;
