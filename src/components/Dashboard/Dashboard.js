import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { Box, Container, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Transactions from '../Transactions/Transactions';
import Charts from '../Charts/Charts';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const sampleData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Sales',
        data: [12, 19, 3, 5, 2],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

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
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Dashboard
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              backgroundColor: '#f1f1f1',
              padding: 2,
              borderRadius: 1,
              textAlign: 'center',
            }}
          >
            <Typography variant="h6">Income</Typography>
            <Typography variant="h5">${income.toFixed(2)}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              backgroundColor: '#f1f1f1',
              padding: 2,
              borderRadius: 1,
              textAlign: 'center',
            }}
          >
            <Typography variant="h6">Expenses</Typography>
            <Typography variant="h5">${expenses.toFixed(2)}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              backgroundColor: '#f1f1f1',
              padding: 2,
              borderRadius: 1,
              textAlign: 'center',
            }}
          >
            <Typography variant="h6">Investments</Typography>
            <Typography variant="h5">${investments.toFixed(2)}</Typography>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 4 }}>
        <Link to="/transactions" style={{ textDecoration: 'none' }}>
          View Transactions
        </Link>
        <Link to="/investments" style={{ textDecoration: 'none' }}>
          View Investments
        </Link>
      </Box>
      <Transactions />
      <Charts data={sampleData} />
    </Container>
  );
};

export default Dashboard;

