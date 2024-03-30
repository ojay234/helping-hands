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

function AreaChart() {
  const chartData = {
    labels: ["1", "2", "3", "4", "5", "6", "7"],
    datasets: [
      {
        label: "Unique Users",
        data: [2900, 3200, 2600, 3500, 2800, 3200, 2700],
        fill: false,
        borderColor: "#8D79F6",
        tension: 0.4,
      },
      {
        label: "Total Users",
        data: [1800, 2500, 2000, 3200, 3800, 3000, 2200],
        fill: true,
        backgroundColor: "#ffd0c2",
        borderColor: "#F25F33",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    tension: 0.4,
    scales: {
      y: {
        ticks: {
          min: 0,
          max: 4000,
          stepSize: 1000,
        },
      },
    },
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg h-[350px]">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}

export default AreaChart;
