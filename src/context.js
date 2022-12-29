import React, { useContext, useEffect, useState } from "react";
import { Network, Alchemy } from "alchemy-sdk";

const settings = {
    apiKey: process.env.REACT_APP_API_KEY,
    network: Network.ETH_MAINNET
};

const alchemy = new Alchemy(settings);

const AppContext = React.createContext();

const AppProvider = ({children}) => {
    const [wallet_address, setWallet_address] = useState("0xshah.eth");
    const [contract_address, setContract_address] = useState("0x61fce80d72363b731425c3a2a46a1a5fed9814b2");
    const [err_message, setErr_message] = useState("");
    const [nfts, setNfts] = useState([]);

    const getNFTs_forOwner = async (address) => {
          try {
             const temp_nfts = await alchemy.nft.getNftsForOwner(address)
             setNfts(temp_nfts["ownedNfts"].filter(nft => nft.media.length > 0));
          } catch(err) {
            setErr_message("Error fetching nfts")
            document.getElementById("alrt").style.display="block"
            console.log(err);
          }
    }

    const getNFTs_forCollection = async (address) => {
          try {
            const temp_nfts = await alchemy.nft.getNftsForContract(address);
            setNfts(temp_nfts["nfts"].filter(nft => nft.media.length > 0));
          } catch(err) {
            setErr_message("Error fetching nfts")
            document.getElementById("alrt").style.display="block"
            console.log("error", err);
          }
    }
    
   useEffect(() => {
    //   console.log(alchemy)
    async function helper() {
        try{
            let nfts = await alchemy.nft.getNftsForOwner(wallet_address);
            // console.log(nfts)
            setNfts(nfts["ownedNfts"].filter(nft => nft.media.length > 0));
        } catch(err) {
            setErr_message("Error fetching nfts")
            document.getElementById("alrt").style.display="block"
            console.log("error", err);
        }
    }

    helper();
   }, [])

    return <AppContext.Provider value={{
        wallet_address,
        setWallet_address,
        getNFTs_forCollection,
        getNFTs_forOwner,
        contract_address,
        setContract_address,
        nfts,
        err_message,
        setErr_message
    }}>
        {
            children
        }
    </AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext);
}

export {AppProvider};