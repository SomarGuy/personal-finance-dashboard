import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import Transactions from '../Transactions/Transactions';


const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      const q = query(
        collection(db, 'data'),
        where('userId', '==', user.uid)
      );
      const querySnapshot = await getDocs(q);
      const newData = [];
      querySnapshot.forEach((doc) => {
        newData.push({ id: doc.id, ...doc.data() });
      });
      setData(newData);
    };

    fetchData();
  }, []);

  const income = data.reduce((acc, item) => acc + item.income, 0);
  const expenses = data.reduce((acc, item) => acc + item.expenses, 0);
  const investments = data.reduce((acc, item) => acc + item.investments, 0);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="summary">
        <div className="summary-item">
          <h3>Income</h3>
          <p>${income.toFixed(2)}</p>
        </div>
        <div className="summary-item">
          <h3>Expenses</h3>
          <p>${expenses.toFixed(2)}</p>
        </div>
        <div className="summary-item">
          <h3>Investments</h3>
          <p>${investments.toFixed(2)}</p>
        </div>
      </div>
      <Link className="view-transactions-link" to="/transactions">View Transactions</Link>
    </div>
  );
};

export default Dashboard;
