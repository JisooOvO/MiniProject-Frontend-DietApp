import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ComboChart = ({dates=[],calories=[],weights=[]}) => {
  const chartRef = useRef(null);
  useEffect(() => {
    const ctx = document.getElementById('comboChart');
    if (chartRef.current) {
      chartRef.current.destroy(); // 이미 차트가 생성되었다면 파괴
    }
    const data = {
      labels: dates,
      datasets: [
        {
          type: 'line',
          label: "몸무게(kg)",
          backgroundColor: 'rgba(255, 99, 132, 1)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2,
          yAxisID: 'y-axis-line',
          data: weights,
        },
        {
          type: 'bar',
          label: "칼로리(kcal)",
          backgroundColor: 'rgba(75,192,192,0.5)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
          yAxisID: 'y-axis-bar',
          data: calories,
        },
      ],
    };

    const options = {
      scales: {
        x: {
          stacked: true,
        },
        yAxes : [
          {
            id: 'y-axis-line',
            type: 'linear',
            position: 'right',
          },
          {
            id: 'y-axis-bar-2',
            type: 'linear',
            position: 'right',
          },
        ],
      },
      responsive: true,
      maintainAspectRatio: false,
    }

    const comboChart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: options,
    });

    chartRef.current = comboChart;
  // eslint-disable-next-line
  }, [dates,calories,weights]);

  return (
    <div className='w-full h-[30rem] p-2'>
      <canvas id="comboChart"></canvas>
    </div>
  );
};

export default ComboChart;
