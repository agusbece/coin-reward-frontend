import { useState, useEffect } from 'react';
import { connectWallet, checkNetwork, getTokenBalance } from '../lib/ethereum';

const TOKEN_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_QUIZ_CONTRACT_ADDRESS || '';

export const useEthereum = () => {
    const [address, setAddress] = useState<string>('');
    const [balance, setBalance] = useState<string>('');

    useEffect(() => {
        const init = async () => {
            const walletAddress = await connectWallet();
            console.log(`walletAddress`, walletAddress);
            if (walletAddress) {
                setAddress(walletAddress);

                const isCorrectNetwork = await checkNetwork();
                if (isCorrectNetwork) {
                    // Replace with your token contract address and ABI
                    const tokenBalance = await getTokenBalance(walletAddress, TOKEN_CONTRACT_ADDRESS);
                    setBalance(tokenBalance);
                } else {
                    // Handle wrong network scenario
                }
            }
        };

        init();
    }, []);

    return { address, balance };
};
