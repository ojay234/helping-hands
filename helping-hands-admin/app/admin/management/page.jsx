"use client";
import ManagementTable from "@components/page-sections/admin-management/admin-table";
import Header from "@components/page-sections/header";

function Management() {
  return (
    <section className="flex flex-col w-[92%] mx-auto gap-4 py-6">
      <Header title="Admin Management" filter={false} />
      <div className="bg-white py-5 rounded-lg">
        <ManagementTable />
      </div>
    </section>
  );
}

export default Management;
