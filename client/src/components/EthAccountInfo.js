import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../context/GlobalState';

export const EthAccountInfo = () => {
    const { web3 } = useContext(GlobalContext);
    const [ethAccount, setEthAccount] = useState("");
    const [accountBalance, setAccountBalance] = useState(0);
    console.log("In eth acount = ",web3);

    useEffect(()=>{
        console.log("in useeffect = ",web3);
        (async ()=>{
            if(web3){
                const account = await web3.eth.getAccounts();
                setEthAccount(account[0]);
                const balance = await web3.eth.getBalance(account[0]);
                setAccountBalance(web3.utils.fromWei(balance,"ether"));
            }
        })();
    },[web3])

    function accountDisplay(){
        if(ethAccount){
            return (
                <div>
                    <span>Address: </span><span>{ethAccount}</span>
                    <br/>
                    <span>Balance: </span><span>{accountBalance} Ether</span>
                </div>);
        }
        else {
            return <div>Loading Web3 and Account Details</div>
        }
    }

    return (
        <div className="eth-account-info-container">
            <div>Ethereum Account Details</div>

            {
                accountDisplay()
            }
            
        </div>
    )
}