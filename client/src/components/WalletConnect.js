import { useState, useEffect } from "react";
import Web3 from "web3";

const WalletConnect = () => {
    const [account, setAccount] = useState(null);

    const connectWallet = async () => {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            const accounts = await web3.eth.requestAccounts();
            setAccount(accounts[0]);
        } else {
            alert("Please install MetaMask!");
        }
    };

    return (
        <div>
            {account ? (
                <p>Connected: {account}</p>
            ) : (
                <button onClick={connectWallet}>Connect Wallet</button>
            )}
        </div>
    );
};

export default WalletConnect;
