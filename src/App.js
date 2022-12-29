import React, { useState } from 'react';
import Alert from './Alert';
import './App.css';
import { useAppContext } from './context';
import NFT from './NFT';

function App() {
  const [type, setType] = useState(1);
  const { nfts, 
    wallet_address,
    setWallet_address,
    getNFTs_forCollection,
    getNFTs_forOwner,
    contract_address,
    setErr_message,
    setContract_address } = useAppContext();

    const handleSubmit = e => {
       if(type == 1) {
            if((  wallet_address.length == 42 && wallet_address.startsWith("0x")) || wallet_address.endsWith(".eth")) {
                 getNFTs_forOwner(wallet_address)
            } else {
              setErr_message("Not a valid wallet address");
              document.getElementById("alrt").style.display="block";
            }
       } else {
            if(contract_address.length == 42 && contract_address.startsWith("0x")) {
              getNFTs_forCollection(contract_address)
            } else {
              setErr_message("Not a valid wallet address");
              document.getElementById("alrt").style.display="block";
            }
       }
    }

    const handleType = val => {
        setType(val)
    } 

  return (
    <div className="App">
      <Alert message=""/>
      <div className='form'>
        <input value={wallet_address} onChange={e => setWallet_address(e.target.value)} placeholder='Search by wallet address...' onClick={e => handleType(1)}></input>
        <input value={contract_address} onChange={e => setContract_address(e.target.value)} placeholder='Search by contract address...' onClick={e => handleType(2)}></input>
        <button onClick={handleSubmit}>Get NFTS</button>
      </div>
          <div className='nfts-center'>
               {   
                nfts.map((nft, id) => {
                 return <NFT key={id} nft={nft}/>
                })
               }
          </div>
    </div>
  );
}

export default App;
