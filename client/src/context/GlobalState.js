import React, { createContext, useReducer, useEffect } from 'react';
import AppReducer from './AppReducer';
import Web3 from 'web3';
// Initial state
const initialState = {
  transactions: [],
  web3: null
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
        console.log("web3 = ",window.web3);
        console.log("ethereum = ",window.ethereum);
        console.log("Web3.givenProvider = ",Web3.givenProvider);
        console.log("window.web3.currentProvider = ",window.web3.currentProvider);
        console.log("window.ethereum.enable = ",window.ethereum.enable);    
        //const web3 = new Web3(window.ethereum);
        const web3 = new Web3(Web3.givenProvider);
        console.log("Web3.givenProvider.enable = ",Web3.givenProvider.enable);
        await Web3.givenProvider.enable();

        setupWeb3(web3);
        //await window.ethereum.enable();
        //console.log("web3 instance = ",web3);
        //const accounts = await web3.eth.getAccounts();
        //console.log("web3 accounts1 = ",accounts);
        
        //const balance = await web3.eth.getBalance(accounts[0]);
        //console.log("  111 Balance = ",web3.utils.fromWei(balance,"ether"));
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

  return (<GlobalContext.Provider value={{
    transactions: state.transactions,
    web3: state.web3,
    deleteTransaction,
    addTransaction
  }}>
    {children}
  </GlobalContext.Provider>);
}