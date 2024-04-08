"use client";
import { useEffect, useState } from "react";
import { useGetOrderDataQuery } from "@/app/api/apiSlice";
import Header from "@components/page-sections/header";
import OrderTable from "@components/page-sections/orders/order-table";

function Orders() {
  const [filter, setFilter] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const { data, isLoading, isError, refetch } = useGetOrderDataQuery({
    pageIndex,
    filter,
  });

  const handleFilter = (from, to) => {
    setFilter(`filter[date][from]=${from}&filter[date][to]=${to}`);
    setFilterDate(`${from} to ${to}`);
    console.log(from, to, "testing");
  };

  useEffect(() => {
    refetch();
  }, []);

  const onPageChange = (label) => {
    setPageIndex(label);
  };
  return (
    <section className="flex flex-col w-[92%] mx-auto gap-4 py-6">
      <Header title="Orders" filter handleFilter={handleFilter} />
      <div className="bg-white py-5 rounded-lg">
        <OrderTable
          data={data}
          isLoading={isLoading}
          onPageChange={onPageChange}
        />
      </div>
    </section>
  );
}

export default Orders;
