import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ComboChart = ({dates=[],calories=[],weights=[]}) => {
  const chartRef = useRef(null);
  console.log(dates,calories,weights)
  useEffect(() => {
    const ctx = document.getElementById('comboChart');
    if (chartRef.current) {
      // 이미 차트가 생성되었다면 파괴
      chartRef.current.destroy();
    }
    const data = {
      labels: dates,
      datasets: [
        {
          type: 'bar',  // Bar 차트
          label: "칼로리",
          backgroundColor: 'rgba(75,192,192,0.2)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
          yAxisID: 'y-axis-bar',
          data: calories,
        },
        {
          type: 'line',  // Line 차트
          label: "몸무게",
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2,
          yAxisID: 'y-axis-line',
          data: weights,
        },
      ],
    };

    const options = {
      scales: {
        x: {
          stacked: true,
        },
        yAxes: {
          yAxes : [
          {
            id: 'y-axis-bar',
            type: 'linear',
            position: 'right',
          },
          {
            id: 'y-axis-line',
            type: 'linear',
            position: 'left',
          },
        ]},
      },
      responsive: true,  // 반응형 설정
      maintainAspectRatio: false,  // 차트 비율 유지 해제
    };

    // Combo Chart 생성
    // eslint-disable-next-line
    const comboChart = new Chart(ctx, {
      type: 'bar',  // 초기 차트 타입 설정 (Combo 차트이므로 한 차트만 초기에 설정)
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
