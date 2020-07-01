import React, { createContext, useReducer, useEffect } from 'react';
import AppReducer from './AppReducer';
import Web3 from 'web3';
import { EXPENSE_TRACKER_ABI, EXPENSE_TRACKER_ADDRESS } from '../contract/ExpenseTrackerContract';
// Initial state
const initialState = {
  transactions: [],
  web3: null,
  contract: null,
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(()=>{
    loadBlockchain();
  },[]);

  async function loadBlockchain(){
    try {
        console.log("Web3.givenProvider = ",Web3.givenProvider);
        const web3 = new Web3(Web3.givenProvider);
        await Web3.givenProvider.enable();
        setupWeb3(web3);
        const contract = new web3.eth.Contract(EXPENSE_TRACKER_ABI,EXPENSE_TRACKER_ADDRESS);
        setupContract(contract);
        console.log("contract = ",contract);
        console.log("contract.methods = ",contract.methods);
        let transactionCount = await contract.methods.transactionCount().call();
        console.log("transaction count = ",transactionCount);
        for(var i=0;i<transactionCount;i++){
            const {amount,transactionDescription,transactionOwner} = await contract.methods.transaction(i).call();
            let transactionObj = {
                amount:parseInt(amount),
                transactionDescription,
                transactionOwner
            }
            console.log("trascations == ",transactionObj);
            addTransaction(transactionObj);
        }
        


    }
    catch(error){
        console.log("Error in loading Web3 = ",error);
    }

  }


  // Actions
  function deleteTransaction(id) {
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: id
    });
  }

  async function addTransactionAsync(transaction){
    const {web3, contract } = state;
    const account = await web3.eth.getAccounts();
    console.log("before transaction");
    const receipt =  await contract.methods.addTransaction(transaction.transactionDescription, transaction.amount).send({from : account[0]});
    console.log("after  transaction ", receipt);
    addTransaction(transaction);
  }
  function addTransaction(transaction) {
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: transaction
    });
  }

  function setupWeb3(web3) {
    dispatch({
      type: 'SETUP_WEB3',
      payload: web3
    });
  }

  function setupContract(contract) {
    dispatch({
      type: 'SETUP_CONTRACT',
      payload: contract
    });
  }

  return (<GlobalContext.Provider value={{
    transactions: state.transactions,
    web3: state.web3,
    contract: state.contract,
    deleteTransaction,
    addTransaction,
    addTransactionAsync
  }}>
    {children}
  </GlobalContext.Provider>);
}