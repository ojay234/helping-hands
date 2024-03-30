import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ chartData, isLoading }) {
  const { allOrders, pendingOrders, confirmedOrders, completeOrders } =
    chartData || {};

  // Calculate the total number of orders
  const totalOrders =
    parseInt(pendingOrders) +
    parseInt(confirmedOrders) +
    parseInt(completeOrders);

  // Define chart data
  const data = {
    labels: ["Pending", "Confirmed", "Cancelled", "Completed"],
    datasets: [
      {
        data: [
          parseInt(pendingOrders),
          parseInt(12),
          parseInt(
            allOrders - pendingOrders - confirmedOrders - completeOrders
          ),
          parseInt(completeOrders),
        ],
        backgroundColor: ["#FFCF64", "#6A85B8", "#FF0202", "#12B76A"],
        borderJoinStyle: "milter",
        spacing: 0,
        borderWidth: [5, 30, 20, 30],
        borderColor: ["#FFCF64", "#6A85B8", "#FF0202", "#12B76A"],
      },
    ],
  };

  // Define chart options
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: "70%",
  };

  return (
    <div className="w-fit bg-white p-4 rounded-lg h-[300px] mx-auto">
      {isLoading ? (
        <div className="text-sm text-center text-gray-400">loading..</div>
      ) : (
        <Doughnut data={data} options={options} />
      )}
    </div>
  );
}

export default PieChart;
