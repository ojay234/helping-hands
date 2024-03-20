"use client";
import ReactApexChart from "react-apexcharts";

function PieChart() {
  const chartOptions = {
    // Define your chart options here
    chart: {
      id: "order donut chart",
      type: "donut",
    },
    legend: {
      show: false,
    },
    toolbar: {
      show: false,
    },
    series: [10, 20, 30, 50],
    labels: ["cancelled", "confirmed", "pending", "completed"],
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              showAlways: true,
              label: "Total Orders",
              fontSize: "26px",
              fontWeight: 700,
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#FF0202", "#6A85B8", "#FFCF64", "#12B76A"],
  };
  return (
    <div className="w-full bg-white p-4 rounded-lg">
      <ReactApexChart
        options={chartOptions}
        series={chartOptions.series}
        type="donut"
        height={300}
      />
    </div>
  );
}

export default PieChart;
