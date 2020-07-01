import React, { createContext, useReducer, useEffect, useContext } from 'react';
import AppReducer from '../store/AppReducer';
import { loadBlockchain } from '../store/asyncActions';

// Initial state
const initialState = {
  transactions: [],
  web3: null,
  accounts: [],
  contract: null,
  web3LoadingErrorMessage:"",
  web3Loadded: false
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    useEffect(()=> {
        loadBlockchain(dispatch);
    },[])

    return (<GlobalContext.Provider value={[state,dispatch]}>
                {children}
            </GlobalContext.Provider>);
}

export const useStore = () => useContext(GlobalContext);