"use client";
import Header from "@components/page-sections/header";
import OrderTable from "@components/page-sections/orders/order-table";
function Orders() {
  return (
    <section className="flex flex-col w-[92%] mx-auto gap-4 py-6">
      <Header title="Orders" />
      <div className="bg-white py-5 rounded-lg">
        <OrderTable />
      </div>
    </section>
  );
}

export default Orders;
