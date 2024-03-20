"use client";
import { useMemo } from "react";
import Header from "@components/page-sections/header";
import DashboardInfo from "@components/page-sections/dashboard/dashboard-info";
import AreaChart from "@components/page-sections/dashboard/charts/area-chart";
import PieChart from "@components/page-sections/dashboard/charts/pie-chart";
import Table from "@components/common/Table";

function Dashboard() {
  const columns = useMemo(
    () => [
      {
        Header: "Order No.",
        accessor: "orderId",
      },
      {
        Header: "Customer Name",
        accessor: "name",
      },
      {
        Header: "Status",
        accessor: "status",
      },
    ],
    []
  );

  const data = useMemo(
    () => [
      {
        orderId: 3130,
        name: "Isaac Adenuga",
        status: "Pending",
      },
      {
        orderId: 3130,
        name: "Isaac Adenuga",
        status: "Pending",
      },
      {
        orderId: 3130,
        name: "Isaac Adenuga",
        status: "Pending",
      },
      {
        orderId: 3130,
        name: "Isaac Adenuga",
        status: "Pending",
      },
      {
        orderId: 3130,
        name: "Isaac Adenuga",
        status: "Pending",
      },
      {
        orderId: 3130,
        name: "Isaac Adenuga",
        status: "Pending",
      },
      {
        orderId: 3130,
        name: "Isaac Adenuga",
        status: "Pending",
      },
      {
        orderId: 3130,
        name: "Isaac Adenuga",
        status: "Pending",
      },
    ],
    []
  );

  return (
    <section className="flex flex-col w-[92%] mx-auto gap-4 py-6">
      <Header title="Dashboard" />
      <div className="flex justify-between">
        <div className="grid gap-4 w-[58%]">
          <DashboardInfo />
          <AreaChart />
        </div>
        <div className="grid gap-4 w-[38%] bg-white">
          <PieChart />
          <Table columns={columns} data={data} />
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
