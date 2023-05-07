import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Box,
} from '@mui/material';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [input, setInput] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState('');

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const q = query(
        collection(db, 'transactions'),
        where('userId', '==', user.uid)
      );
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
        description: input,
      });
      setInput('');
      setEditMode(false);
    } else {
      const user = auth.currentUser;
      await addDoc(collection(db, 'transactions'), {
        userId: user.uid,
        description: input,
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
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Transactions
      </Typography>

      <Box
        component="form"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '20px',
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          fullWidth
          variant="outlined"
          label="Transaction"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          sx={{ marginRight: '10px' }}
        />
        <Button type="submit" variant="contained" color="primary">
          {editMode ? 'Update' : 'Add'}
        </Button>
      </Box>

      <List>
        {transactions.map((item) => (
          <ListItem
            key={item.id}
            sx={{
              backgroundColor: '#f1f1f1',
              marginBottom: '5px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px',
            }}
          >
            <ListItemText primary={item.description} />
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleEdit(item)}
                sx={{ marginRight: '10px' }}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </Button>
            </div>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Transactions;
