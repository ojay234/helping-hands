"use client";
import Header from "@components/page-sections/header";
import CustomersTable from "@/app/components/page-sections/customers/customers-table";
import { useGetCustomerDataQuery } from "@/app/api/apiSlice";
import { useState } from "react";

function Customers() {
  const [pageIndex, setPageIndex] = useState(1);
  const { data, isLoading, refetch } = useGetCustomerDataQuery(pageIndex);

  const onPageChange = (label) => {
    setPageIndex(label);
  };
  const refetchData = () => {
    refetch();
  };

  return (
    <section className="flex flex-col w-[92%] mx-auto gap-4 py-6">
      <Header title="Customers" />
      <div className="bg-white py-5 rounded-lg">
        <CustomersTable
          data={data}
          isLoading={isLoading}
          onPageChange={onPageChange}
          refetchData={refetchData}
        />
      </div>
    </section>
  );
}

export default Customers;
