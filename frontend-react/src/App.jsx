import React, { useState, useEffect } from "react";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [merchant, setMerchant] = useState("");
  const [amount, setAmount] = useState("");

  // Load existing transactions
  useEffect(() => {
    fetch("http://127.0.0.1:8000/transactions")
      .then(res => res.json())
      .then(data => setTransactions(data))
      .catch(err => console.error("Error loading transactions:", err));
  }, []);

  // Add transaction
  const addTransaction = () => {
    fetch("http://127.0.0.1:8000/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ merchant, amount: parseFloat(amount) })
    })
      .then(res => res.json())
      .then(tx => {
        console.log("Backend response:", tx); // Debug log
        setTransactions([...transactions, tx]);
        setMerchant("");
        setAmount("");
      })
      .catch(err => console.error("Error adding transaction:", err));
  };

  return (
    <div>
      <h1>Merchant Dashboard</h1>
      <input
        value={merchant}
        onChange={e => setMerchant(e.target.value)}
        placeholder="Merchant"
      />
      <input
        value={amount}
        onChange={e => setAmount(e.target.value)}
        placeholder="Amount"
        type="number"
      />
      <button onClick={addTransaction}>Add Transaction</button>

      <h2>Transactions</h2>
      <table border="1" style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Merchant</th>
            <th>Amount</th>
            <th>Hash</th>
            <th>Credits</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <tr key={tx.id}>
              <td>{tx.id}</td>
              <td>{tx.merchant}</td>
              <td>{tx.amount}</td>
              <td>{tx.hash}</td>
              <td>{tx.credits}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
