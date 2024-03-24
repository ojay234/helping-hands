"use client";
import Header from "@components/page-sections/header";
import DashboardInfo from "@components/page-sections/dashboard/dashboard-info";
import AreaChart from "@components/page-sections/dashboard/charts/area-chart";
import PieChart from "@components/page-sections/dashboard/charts/pie-chart";
import {
  DashboardOrderTable,
  InfoTable,
} from "@components/page-sections/dashboard/dashboard-tables";

function Dashboard() {
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
          <DashboardOrderTable />
        </div>
      </div>
      <div>
        <InfoTable />
      </div>
    </section>
  );
}

export default Dashboard;
