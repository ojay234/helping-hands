"use client";
import Header from "@components/page-sections/header";
import CustomersTable from "@/app/components/page-sections/customers/customers-table";

function Customers() {
  return (
    <section className="flex flex-col w-[92%] mx-auto gap-4 py-6">
      <Header title="Customers" />
      <div className="bg-white py-5 rounded-lg">
        <CustomersTable />
      </div>
    </section>
  );
}

export default Customers;
