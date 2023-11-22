import { useState, useEffect, useCallback } from 'react';
import { connectWallet, checkNetwork, getTokenBalance, submitSurvey } from '../lib/ethereum';
import { Uint256 } from 'web3';

const TOKEN_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_QUIZ_CONTRACT_ADDRESS || '';

export const useWallet = () => {
    const [address, setAddress] = useState<string>('');
    const [balance, setBalance] = useState<string>('');

    useEffect(() => {
        const init = async () => {
            const walletAddress = await connectWallet();
            if (walletAddress) {
                setAddress(walletAddress);

                const isCorrectNetwork = await checkNetwork();
                if (isCorrectNetwork) {
                    // Replace with your wallet address & token contract address
                    const tokenBalance = await getTokenBalance(walletAddress, TOKEN_CONTRACT_ADDRESS);
                    setBalance(tokenBalance);
                } else {
                    // Handle wrong network scenario
                }
            }
        };

        init();
    }, []);

    const updateQUIZBalance = async (address: string) => {
        const tokenBalance = await getTokenBalance(address, TOKEN_CONTRACT_ADDRESS);
        setBalance(tokenBalance);
    };

    const submitFormSurveyToContract = useCallback(
        async (surveyId: bigint, answers: Uint256[]) => {
            const response = await submitSurvey(TOKEN_CONTRACT_ADDRESS, address, surveyId, answers);
            updateQUIZBalance(address);
            return response;
        },
        [address]
    );

    return { address, balance, submitFormSurveyToContract };
};
