"use client";

import ReactApexChart from "react-apexcharts";

function AreaChart() {
  const chartOptions = {
    // Define your chart options here
    chart: {
      id: "user area chart",
      type: "area",
    },
    toolbar: {
      show: false,
      tools: {
        download: true,
        selection: false,
        zoom: false,
        zoomin: false,
        zoomout: false,
        pan: false,
      },
    },
    stroke: {
      curve: "smooth",
    },
    legend: {
      position: "top",
    },
    series: [
      {
        type: "area",
        name: "Total Users",
        data: [3000, 3500, 2800, 3200, 2500, 2900, 2300],

        color: "#F25F33",
      },
      {
        name: "Unique Users",
        data: [3100, 3800, 3000, 3500, 2800, 3200, 2700],
        color: "#8D79F6",
      },
    ],
    grid: {
      borderColor: " #171724",
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
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.5,
        opacityFrom: 1,
        opacityTo: 0,
        stops: [0, 100],
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
      />
    </div>
  );
}

export default AreaChart;
