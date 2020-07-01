import { setupWeb3, setupContract, addEthereumAccounts, addTransaction } from "./actions";
import Web3 from "web3";
import { EXPENSE_TRACKER_ABI, EXPENSE_TRACKER_ADDRESS } from '../contract/ExpenseTrackerContract';

export const loadBlockchain = async(dispatch) =>{
    try {
        console.log("Web3.givenProvider = ",Web3.givenProvider);
        const web3 = new Web3(Web3.givenProvider);
        await Web3.givenProvider.enable();
        dispatch(setupWeb3(web3));
        const contract = new web3.eth.Contract(EXPENSE_TRACKER_ABI,EXPENSE_TRACKER_ADDRESS);
        dispatch(setupContract(contract));
        const accounts = await web3.eth.getAccounts();
        dispatch(addEthereumAccounts(accounts));
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
            dispatch(addTransaction(transactionObj));
        }
        
    }
    catch(error){
        console.log("Error in loading Web3 = ",error);
    }
}


export const addTransactionAsync = async(contract, accounts, transaction, dispatch)=>{
    console.log("before transaction");
    const receipt =  await contract.methods.addTransaction(transaction.transactionDescription, transaction.amount).send({from : accounts[0]});
    console.log("after  transaction ", receipt);
    dispatch(addTransaction(transaction));
}
