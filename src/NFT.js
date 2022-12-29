import React from 'react'

function NFT({nft}) {
   
    const helper = (val) => {
        if(val && val.length >= 25) {
            return (val.slice(0, 25)+"...")
        }
        return val;
    }

    const handleCopy = e => {
        navigator.clipboard.writeText(nft.contract.address);

        // Alert the copied text
        alert("Copied the text: " + nft.contract.address);
    }

  return (
    <div className='nft'>
        <div className='nft-image'>
            <img src={nft.media.length ? nft.media[0].gateway : ''} alt="NFT"></img>
        </div>
        
        <div className='nft-info'>
            <h4>{helper(nft.title)}</h4>
            <p>{helper(nft.tokenId)}</p>
            <p className='address' onClick={handleCopy}>{helper(nft.contract.address)}</p>
            <div className='nft-description'>
                <p>{helper(nft.description)}</p>
            </div>
        </div>
        <div className='etherscan'>
            <a href={`https://etherscan.io/address/${nft.contract.address}`} target="_blank">ETHERSCAN</a>
        </div>

    </div>
  )
}

export default NFT