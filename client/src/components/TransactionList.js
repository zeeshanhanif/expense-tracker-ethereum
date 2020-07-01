import React from 'react';
import { Transaction } from './Transaction';

import { useStore } from '../context/GlobalState';

export const TransactionList = () => {
    const [{transactions}] = useStore();

  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transactions.map((transaction,index) => (<Transaction key={index} transaction={transaction} />))}
      </ul>
    </>
  )
}