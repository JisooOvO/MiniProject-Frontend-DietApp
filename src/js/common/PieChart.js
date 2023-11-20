import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

const ChartComponent = () => {
  Chart.register(ArcElement, Tooltip, Legend);

  const data = {
    labels: ["A", "B"],
    datasets: [
      {
        label: "내 첫 번째 데이터셋",
        data: [300, 100],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(255, 205, 86)"],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js 파이 차트",
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => {
            const labelIndex = context.dataIndex;
            const dataValue = context.dataset.data[labelIndex];
            return `${data.labels[labelIndex]}: ${dataValue}`;
          },
        },
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default ChartComponent;
