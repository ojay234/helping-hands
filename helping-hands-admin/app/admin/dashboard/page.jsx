"use client";
import {
  useGetDashboardDataQuery,
  useGetHomeStatisticQuery,
} from "@api/apiSlice";
import Header from "@components/page-sections/header";
import DashboardInfo from "@components/page-sections/dashboard/dashboard-info";
import AreaChart from "@components/page-sections/dashboard/charts/area-chart";
import PieChart from "@components/page-sections/dashboard/charts/pie-chart";
import {
  DashboardOrderTable,
  InfoTable,
} from "@components/page-sections/dashboard/dashboard-tables";
import Link from "next/link";
import { useState } from "react";

function Dashboard() {
  const [filter, setFilter] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const { data, isLoading: dashboardDataLoading } =
    useGetDashboardDataQuery(filter);
  const { data: homeStatistics, isLoading: homeStatisticLoading } =
    useGetHomeStatisticQuery();

  const handleFilter = (from, to) => {
    setFilter(`filter[date][from]=${from}&filter[date][to]=${to}`);
    setFilterDate(`${from} to ${to}`);
  };

  return (
    <section className="flex flex-col w-[92%] mx-auto gap-4 py-6">
      <Header title="Dashboard" filter handleFilter={handleFilter} />
      <div className="flex justify-between">
        <div className="grid gap-8 w-[56%]">
          <DashboardInfo
            statistic={data?.data?.performanceStatistic}
            filterDate={filterDate}
          />
          <AreaChart
            isLoading={dashboardDataLoading}
            data={data?.data?.userRetention}
          />
        </div>
        <div className="grid gap-4 w-[38%] bg-white custom-shadow rounded-[12px]">
          <PieChart
            chartData={homeStatistics?.data}
            isLoading={homeStatisticLoading}
          />
          <DashboardOrderTable
            rowData={data?.data?.orderStatistic.summary}
            isLoading={dashboardDataLoading}
          />
          {data?.data && (
            <Link
              href="/admin/orders"
              className="text-right underline mx-3 my-2"
            >
              View all
            </Link>
          )}
        </div>
      </div>
      <div className="custom-shadow  ">
        <InfoTable
          rowData={data?.data?.topDistrictSummary}
          isLoading={dashboardDataLoading}
        />
      </div>
    </section>
  );
}

export default Dashboard;
