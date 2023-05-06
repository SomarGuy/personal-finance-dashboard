import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Investments.css';

const Investments = () => {
  const [stockData, setStockData] = useState(null);
  const [symbol, setSymbol] = useState('MSFT'); // Default symbol

  const apiKey = 'YOUR_API_KEY'; // Replace with your Alpha Vantage API key

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`
        );
        setStockData(response.data['Global Quote']);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchStockData();
  }, [symbol]);

  return (
    <div className="investments">
      <h2>Investments</h2>
      <input
        type="text"
        placeholder="Enter stock symbol"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      />
      {stockData && (
        <div className="stock-data">
          <p>Symbol: {stockData['01. symbol']}</p>
          <p>Open: ${stockData['02. open']}</p>
          <p>High: ${stockData['03. high']}</p>
          <p>Low: ${stockData['04. low']}</p>
          <p>Price: ${stockData['05. price']}</p>
          <p>Volume: {stockData['06. volume']}</p>
          <p>Latest trading day: {stockData['07. latest trading day']}</p>
          <p>Previous close: ${stockData['08. previous close']}</p>
          <p>Change: ${stockData['09. change']}</p>
          <p>Change percent: {stockData['10. change percent']}</p>
        </div>
      )}
    </div>
  );
};

export default Investments;
