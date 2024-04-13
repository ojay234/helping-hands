"use client";
import Header from "@components/page-sections/header";
import CustomersTable from "@/app/components/page-sections/customers/customers-table";
import { useGetCustomerDataQuery } from "@/app/api/apiSlice";
import { useState } from "react";

function Customers() {
  const [pageIndex, setPageIndex] = useState(1);
  const [filter, setFilter] = useState("");
  const { data, isLoading, refetch } = useGetCustomerDataQuery({
    pageIndex,
    filter,
  });

  const onPageChange = (label) => {
    setPageIndex(label);
  };
  const refetchData = () => {
    refetch();
  };
  const handleFilter = (from, to) => {
    setFilter(`filter[date][from]=${from}&filter[date][to]=${to}`);
  };

  return (
    <section className="flex flex-col w-[92%] mx-auto gap-4 py-6">
      <Header title="Customers" filter handleFilter={handleFilter} />
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
