import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Box,
} from '@mui/material';

const Investments = () => {
  const [symbol, setSymbol] = useState('');
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setSymbol(e.target.value);
  };

  useEffect(() => {
    const fetchStockData = async () => {
      if (symbol) {
        try {
          const response = await axios.get(
            `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=67HFUEPTDSR2639Y`
          );
          if (response.data['Error Message']) {
            setError('Invalid symbol. Please try again.');
            setStockData(null);
          } else {
            setError('');
            setStockData(response.data['Global Quote']);
          }
        } catch (error) {
          setError('Error fetching stock data. Please try again.');
          setStockData(null);
        }
      }
    };
    const timer = setTimeout(fetchStockData, 500);
    return () => clearTimeout(timer);
  }, [symbol]);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Investments
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '20px',
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          label="Enter stock symbol (e.g., MSFT, AAPL)"
          value={symbol}
          onChange={handleChange}
          sx={{ marginRight: '10px' }}
        />
      </Box>

      {error && <p>{error}</p>}
      {stockData && (
        <div>
          <h2>Stock Data:</h2>
          <pre>{JSON.stringify(stockData, null, 2)}</pre>
        </div>
      )}

      {/* Your existing investments list and related components can stay unchanged */}
    </Container>
  );
};

export default Investments;
