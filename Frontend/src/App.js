import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const response = await axios.get('http://localhost:8080/api/expenses');
    setExpenses(response.data);
  };

  const addExpense = async () => {
    await axios.post('http://localhost:8080/api/expenses', {
      title,
      category,
      amount,
    });

    fetchExpenses();

    setTitle('');
    setCategory('');
    setAmount('');
  };

  return (
    <div>
      <h1>Smart Expense Tracker</h1>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={addExpense}>Add Expense</button>

      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.title} - {expense.category} - ₹{expense.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;