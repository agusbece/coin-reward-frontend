import React, { useContext } from 'react';
import { EthereumContext, EthereumContextProps } from '@/app/context/wallet.context';
import { truncateAddress } from '@/utils/walletUtils';

const WalletInfo: React.FC = () => {
    const ethereumContext = useContext(EthereumContext);
    const { address, balance } = ethereumContext as EthereumContextProps;

    return (
        <div>
            <p>Wallet Address: {truncateAddress(address)}</p>
            <p>Balance: {balance} QUIZ</p>
        </div>
    );
};

export default WalletInfo;
