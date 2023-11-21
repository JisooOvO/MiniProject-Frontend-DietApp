import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';

const HorizontalBarChart = () => {
  const data = {
    labels: ["A", "B"],
    datasets: [
      {
        label: "데이터셋",
        data: [10, 20],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
      },
    },
    indexAxis: "y", // y축을 기준으로 수평 막대 차트로 설정
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Horizontal Bar Chart",
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default HorizontalBarChart;
