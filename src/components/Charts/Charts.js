import React, { useEffect, useRef } from 'react';
import { Chart, BarController, BarElement, PointElement, LinearScale, CategoryScale, TimeScale, Filler } from 'chart.js';

// Register the necessary elements, scales, and controllers
Chart.register(BarController, BarElement, PointElement, LinearScale, CategoryScale, TimeScale, Filler);

const Charts = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      const chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: '2022',
              data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
              backgroundColor: 'rgb(75, 192, 192)',
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: 'category',
            },
            y: {
              type: 'linear',
            },
          },
        },
      });

      return () => {
        chart.destroy();
      };
    }
  }, [chartRef]);

  return (
    <div>
      <canvas ref={chartRef} width="400" height="200"></canvas>
    </div>
  );
};

export default Charts;
