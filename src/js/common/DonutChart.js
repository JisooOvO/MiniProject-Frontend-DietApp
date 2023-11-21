import React from "react";
import { Doughnut } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import "../../style/responsive.css"

const DonutChart = () => {
  const data = {
    labels: ["Adsadasdsad", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
    datasets: [
      {
        label: "내 첫 번째 데이터셋",
        data: [1800, 100, 200, 150, 250, 180, 120, 80, 300, 50],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(255, 205, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgba(255, 0, 0, 0.5)",
          "rgba(0, 255, 0, 0.5)",
          "rgba(0, 0, 255, 0.5)",
          "rgba(128, 128, 128, 0.5)",
        ],
        borderWidth: 3,
        hoverOffset: 4,
        cutout: "40%", // 도넛 차트의 중앙 빈 영역 설정
      },
      {
        label: "내 첫 번째 데이터셋",
        data: [300, 10, 20, 10, 250, 180, 120, 80, 300, 50],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(255, 205, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgba(255, 0, 0, 0.5)",
          "rgba(0, 255, 0, 0.5)",
          "rgba(0, 0, 255, 0.5)",
          "rgba(128, 128, 128, 0.5)",
        ],
        borderWidth: 3,
        hoverOffset: 4,
        cutout: "40%", // 도넛 차트의 중앙 빈 영역 설정
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
        labels: {
          fontSize: 200, // 범례 크기 설정
        },
      },
      title: {
        display: true,
        text: "Chart.js 도넛 차트",
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => {
            const labelIndex = context.dataIndex;
            const dataValue = context.dataset.data[labelIndex];
            return `${data.labels[labelIndex]}: ${dataValue} 단위`;
          },
        },
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default DonutChart;
