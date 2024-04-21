import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function AreaChart({ isLoading, data }) {
  const usersData = data?.map((item) => parseInt(item.users));
  const dates = data?.map((item) => {
    const dateRange = item.date.split(" - ");
    const startDate = moment(dateRange[0]).format("MM/DD");
    const endDate = moment(dateRange[1]).format("MM/DD");
    return `${endDate}`;
  });
  const maxData = data ? Math.max(...usersData) : 0;

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: "Total Users",
        data: usersData,
        fill: true,
        backgroundColor: "#ffd0c2",
        borderColor: "#F25F33",
        tension: 0.4,
        pointRadius: 0, // Hide points
      },
    ],
  };

  const chartOptions = {
    tension: 0.4,
    scales: {
      y: {
        ticks: {
          min: 0,
          max: maxData,
          stepSize: 1000,
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide legend
      },
    },
  };

  return (
    <>
      {isLoading ? (
        <div className="text-sm text-center text-gray-400">loading..</div>
      ) : (
        <div className="w-full bg-white p-4 rounded-[12px] ">
          <div className="flex justify-between mt-2 mb-4">
            <h1 className="font-bold">User Retention</h1>
            <p className="flex items-center gap-2 text-sm">
              <span className="bg-[#F25F33] h-3 w-3 rounded-full" />
              <span>Total Users</span>
            </p>
          </div>
          <div className="">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      )}
    </>
  );
}

export default AreaChart;
