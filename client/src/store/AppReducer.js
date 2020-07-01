export default (state, action) => {
    switch(action.type) {
      case 'DELETE_TRANSACTION':
        return {
          ...state,
          transactions: state.transactions.filter(transaction => transaction.id !== action.payload)
        }
      case 'ADD_TRANSACTION':
        return {
          ...state,
          transactions: [action.payload, ...state.transactions]
        }
      case 'SETUP_WEB3':
        return {
          ...state,
          web3: action.payload
        }
      case 'SETUP_CONTRACT':
        return {
          ...state,
          contract: action.payload
        }
      case 'ADD_ETHEREUM_ACCOUNTS':
        return {
          ...state,
          accounts: action.payload
        }
      default:
        return state;
    }
  }