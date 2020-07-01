import React, { useState } from 'react'
import { useStore } from '../context/GlobalState';
import { addTransactionAsync } from '../store/asyncActions';
import Loader from '../images/loader.gif'

export const AddTransaction = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);
  const [{contract, accounts}, dispatch] = useStore();

  const [isTransactionInProcess, setTransactionInprocess] = useState(false);
  const [isTransactionSuccessful , setTransactionSuccessful] = useState(true);
  const [transactionError , setTransactionError] = useState("");

  const onSubmit = async(e) => {
    e.preventDefault();
    setTransactionSuccessful(true);
    setTransactionError("");
    try {
        setTransactionInprocess(true)
        const newTransaction = {
          //id: Math.floor(Math.random() * 100000000),
          transactionDescription : text,
          amount: +amount
        }
        await addTransactionAsync(contract, accounts,newTransaction, dispatch);
        setTransactionInprocess(false);
        setTransactionSuccessful(true);
    }catch (error){
        console.log("error trax = ",error);
        setTransactionInprocess(false);
        setTransactionSuccessful(false);
        setTransactionError(error.message);
    }
  }

  return (
    <>
      <h3>Add new transaction {isTransactionInProcess && <img width="40px" src={Loader} alt="Loading..." />}</h3>
      {!isTransactionSuccessful && <div style={{color:"red"}}>{transactionError}</div>}
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..." />
        </div>
        <div className="form-control">
          <label htmlFor="amount"
            >Amount <br />
            (negative - expense, positive - income)</label
          >
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." />
        </div>
        {
            isTransactionInProcess ?
            <div className="btn">Transaction in Process.....</div> :
            <button className="btn">Add transaction</button>
        }
        
      </form>
    </>
  )
}