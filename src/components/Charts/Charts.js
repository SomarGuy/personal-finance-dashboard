import React, { useEffect, useState, useRef } from 'react';
import { auth } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
} from 'chart.js';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController
);


const Charts = () => {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState({});
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      const q = query(collection(db, 'data'), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const newData = [];
      querySnapshot.forEach((doc) => {
        newData.push({ id: doc.id, ...doc.data(), date: '2023-05-01' }); // Add placeholder date
      });
      console.log('Fetched Data:', newData);
      setData(newData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!data || !chartRef || !chartRef.current) return;
  
    const chartData = {
      labels: data.map((item) => item.date) || [],
      datasets: [
        {
          label: 'Income',
          data: data.map((item) => item.income) || [],
          borderColor: 'rgba(75, 192, 192, 1)',
          fill: false,
        },
        {
          label: 'Expenses',
          data: data.map((item) => item.expenses) || [],
          borderColor: 'rgba(255, 99, 132, 1)',
          fill: false,
        },
      ],
    };

    console.log('Chart Data:', chartData);
  
    const chartInstance = new Chart(chartRef.current, {
      type: 'line',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  
    return () => {
      chartInstance.destroy();
    };
  }, [data, chartRef]);

  

  return (
    <div>
      <h2>Charts</h2>
      <div style={{ position: 'relative', height: '40vh', width: '80vw' }}>
        <canvas ref={chartRef} />
      </div>
    </div>
  )};

export default Charts;
