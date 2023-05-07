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
              label: 'Stock Price',
              data: [150, 180, 170, 190, 210, 230, 220, 240, 260, 280, 270, 290],
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
