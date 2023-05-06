import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore';
import './Transactions.css';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [input, setInput] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState('');

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const q = query(collection(db, 'transactions'), where('userId', '==', user.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const newData = [];
        querySnapshot.forEach((doc) => {
          newData.push({ id: doc.id, ...doc.data() });
        });
        setTransactions(newData);
      });

      return () => {
        unsubscribe();
      };
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editMode) {
      await updateDoc(doc(db, 'transactions', editId), {
        description: input
      });
      setInput('');
      setEditMode(false);
    } else {
      const user = auth.currentUser;
      await addDoc(collection(db, 'transactions'), {
        userId: user.uid,
        description: input
      });
      setInput('');
    }
  };

  const handleEdit = (transaction) => {
    setInput(transaction.description);
    setEditMode(true);
    setEditId(transaction.id);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'transactions', id));
  };

  return (
    <div className="transactions">
      <h2>Transactions</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter transaction"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">{editMode ? 'Edit' : 'Add'}</button>
      </form>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.description}
            <button onClick={() => handleEdit(transaction)}>Edit</button>
            <button onClick={() => handleDelete(transaction.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;
