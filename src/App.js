import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [symbol, setSymbol] = useState('');
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchStockPrice = async () => {
    setLoading(true);
    setError('');
    setPrice(null);
    try {
      const apiKey = 'demo'; // Replace with your actual API key
      const response = await axios.get(`https://www.alphavantage.co/query`, {
        params: {
          function: 'GLOBAL_QUOTE',
          symbol: symbol,
          apikey: apiKey,
        },
      });

      const quote = response.data["Global Quote"];
      if (quote && quote["05. price"]) {
        setPrice(quote["05. price"]);
      } else {
        setError('Stock not found or API limit reached.');
      }
    } catch (err) {
      setError('Error fetching stock price.');
    }
    setLoading(false);
  };

  return (
    <div className="app">
      <h1>📈 Stock Price Checker</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Enter stock symbol (e.g. AAPL)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        />
        <button onClick={fetchStockPrice} disabled={loading}>
          {loading ? 'Loading...' : 'Check'}
        </button>
      </div>

      {price && (
        <div className="result">
          <p>Current Price: <span>${parseFloat(price).toFixed(2)}</span></p>
        </div>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default App;
