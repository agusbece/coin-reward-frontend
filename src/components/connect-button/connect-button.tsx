import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { EthereumContext, EthereumContextProps } from '@/app/context/wallet.context';

export const ConnectButton: React.FC = () => {
    const ethereumContext = useContext(EthereumContext);
    const { tryConnectWallet } = ethereumContext as EthereumContextProps;

    return (
        <Button variant="contained" onClick={() => tryConnectWallet()}>
            Connect Wallet
        </Button>
    );
};
