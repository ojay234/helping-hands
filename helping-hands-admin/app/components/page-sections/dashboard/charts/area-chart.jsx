"use client";
import dynamic from "next/dynamic";

// Dynamically import ApexCharts to avoid SSR issues
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

function AreaChart() {
  const chartOptions = {
    // Define your chart options here
    chart: {
      id: "user area chart",
    },
    toolbar: {
      show: false,
    },
    stroke: {
      curve: "smooth",
      width: [3, 3],
      colors: ["#8D79F6", "#F25F33"],
    },
    legend: {
      position: "top",
    },

    series: [
      {
        name: "Unique Users",
        data: [2900, 3200, 2600, 3500, 2800, 3200, 2700],
        type: "line",
        color: "#8D79F6",
      },
      {
        type: "area",
        name: "Total Users",
        data: [1800, 2500, 2000, 3200, 3800, 3000, 2200],
        color: "#f5d4d4",
      },
    ],
    grid: {
      borderColor: "#171724",
      strokeDashArray: 7,
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    fill: {
      type: "solid",
      gradient: {
        shade: "light",
        type: "vertical",
      },
    },
    xaxis: {
      categories: [1, 2, 3, 4, 5, 6, 7],
    },
    yaxis: {
      stepSize: 1000,
      min: 0,
    },
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg">
      <ReactApexChart
        options={chartOptions}
        series={chartOptions.series}
        type="line"
        height={350}
        width="100%"
      />
    </div>
  );
}

export default AreaChart;
