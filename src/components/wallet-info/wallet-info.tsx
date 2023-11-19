import React from 'react';
import { useEthereum } from '../../hooks/useEthereum';

const WalletInfo: React.FC = () => {
    const { address, balance } = useEthereum();

    console.log(`address, balance`, address, balance);

    return (
        <div>
            <p>Address: {address}</p>
            <p>Balance: {balance}</p>
        </div>
    );
};

export default WalletInfo;
