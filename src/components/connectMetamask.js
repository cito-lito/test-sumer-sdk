import { useWeb3React } from '@web3-react/core'
import React, { useState, useEffect } from "react";
//
import { Button } from '@mui/material';

import { InjectedConnector } from '@web3-react/injected-connector'
export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 137, 80001, 42161, 421611]
})

export default function ConnectMetamask() {
    const { active, account, chainId, activate, deactivate } = useWeb3React();
    const [hasMetamask, setHasMetamask] = useState(false);
    useEffect(() => {
        if (typeof window.ethereum !== "undefined") {
            setHasMetamask(true);
        }
    });

    if (!hasMetamask) {
        return (
            <div>
                <a href="https://metamask.io/" target="_blank" rel="noreferrer">Please install Metamask</a>
            </div >
        )
    }
    if (!active) {
        return (
            <div >
                <Button href="#" color='primary' variant="outlined" sx={{ my: 1, mx: 1.5 }}
                    onClick={() => { activate(injected) }}>Connect Metamask</Button>
            </div >
        )

    } else if (chainId == 5) {
        return (
            <div >User Address: {account}
                < Button href="#" variant="text" sx={{ my: 1, mx: 1.5 }} color="error"
                    onClick={deactivate} > disconnect</Button >
            </div >
        )

    } else {
        return (
            <div >
                {alert("please change to the göerli testnet")}
            </div >
        )
    }

}

