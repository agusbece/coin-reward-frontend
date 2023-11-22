import React, { useContext } from 'react';
import { EthereumContext, EthereumContextProps } from '@/app/context/wallet.context';

const WalletInfo: React.FC = () => {
    const ethereumContext = useContext(EthereumContext);
    const { address, balance } = ethereumContext as EthereumContextProps;

    return (
        <div>
            <p>Address: {address}</p>
            <p>Balance: {balance} QUIZ</p>
        </div>
    );
};

export default WalletInfo;
