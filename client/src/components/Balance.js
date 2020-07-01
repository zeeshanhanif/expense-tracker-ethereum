import React from 'react';
import { useStore } from '../context/GlobalState';

export const Balance = () => {
  const [{transactions}] = useStore();

  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  return (
    <>
      <h4>Your Balance</h4>
    <h1>${total}</h1>
    </>
  )
}