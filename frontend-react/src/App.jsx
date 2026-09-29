import { useEffect, useState } from "react";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [merchant, setMerchant] = useState("");
  const [amount, setAmount] = useState("");

  // Fetch transactions from backend
  useEffect(() => {
    fetch("http://127.0.0.1:8000/transactions")
      .then(res => res.json())
      .then(setTransactions)
      .catch(err => console.error("Error fetching transactions:", err));
  }, []);

  // Add new transaction
  const addTransaction = () => {
    fetch(`http://127.0.0.1:8000/transactions?merchant=${merchant}&amount=${amount}`, {
      method: "POST"
    })
      .then(res => res.json())
      .then(tx => {
        setTransactions([...transactions, tx]); // update instantly
        setMerchant("");
        setAmount("");
      })
      .catch(err => console.error("Error adding transaction:", err));
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1>Merchant Dashboard</h1>

      {/* Form to add transaction */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Merchant"
          value={merchant}
          onChange={e => setMerchant(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button onClick={addTransaction}>Add Transaction</button>
      </div>

      {/* Transactions table */}
      <h2>Transactions</h2>
      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr style={{ background: "#eee" }}>
            <th>ID</th>
            <th>Merchant</th>
            <th>Amount</th>
            <th>Hash</th>
            <th>Credits</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <tr key={tx.id}>
              <td>{tx.id}</td>
              <td>{tx.merchant}</td>
              <td>{tx.amount}</td>
              <td>{tx.hash}</td>
              <td style={{ color: tx.credits > 0 ? "green" : tx.credits < 0 ? "red" : "black" }}>
                {tx.credits}
              </td>
              <td>{tx.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
