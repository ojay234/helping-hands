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

function Dashboard() {
  const { data, isLoading: dashboardDataLoading } = useGetDashboardDataQuery();
  const { data: homeStatistics, isLoading: homeStatisticLoading } =
    useGetHomeStatisticQuery();

  console.log(homeStatistics);

  return (
    <section className="flex flex-col w-[92%] mx-auto gap-4 py-6">
      <Header title="Dashboard" />
      <div className="flex justify-between">
        <div className="grid gap-4 w-[58%]">
          <DashboardInfo statistic={data?.data?.performanceStatistic} />
          <AreaChart />
        </div>
        <div className="grid gap-4 w-[38%] bg-white custom-shadow rounded-lg">
          <PieChart
            chartData={homeStatistics?.data}
            isLoading={homeStatisticLoading}
          />
          <DashboardOrderTable
            rowData={data?.data?.orderStatistic.summary}
            isLoading={dashboardDataLoading}
          />
          <Link href="/admin/orders" className="text-right underline mx-3 my-2">
            View all
          </Link>
        </div>
      </div>
      <div className="custom-shadow rounded-lg">
        <InfoTable
          rowData={data?.data?.topDistrictSummary}
          isLoading={dashboardDataLoading}
        />
      </div>
    </section>
  );
}

export default Dashboard;
