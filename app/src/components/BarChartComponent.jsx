import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

const data = {
  labels: Array.from({ length: 25 }, (_, i) => `Day ${i + 1}`), 
  datasets: [
    {
      label: "Expenses",
      data: Array.from({ length: 25 }, () => Math.floor(Math.random() * 500) + 100), 
      backgroundColor: "rgba(59, 130, 246, 0.6)", 
      borderRadius: 5,
      barThickness: 10, 
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false, 
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false, 
    },
  },
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false, 
    },
  },
};

const BarChartComponent = () => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg" style={{ height: "100px", width: "100%" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChartComponent;