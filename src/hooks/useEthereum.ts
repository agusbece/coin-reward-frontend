import { useState, useEffect, useCallback } from 'react';
import { connectWallet, checkNetwork, getTokenBalance, submitSurvey } from '../lib/ethereum';
import { Uint256 } from 'web3';

const TOKEN_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_QUIZ_CONTRACT_ADDRESS || '';

// import { injectable } from 'inversify';

// @injectable()
// export class useEthereum {
//     // ... existing code ...
// }
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

    const updateQUIZBalance = async (address: string) => {
        const tokenBalance = await getTokenBalance(address, TOKEN_CONTRACT_ADDRESS);
        console.log(`address ${address} - tokenBalance`, tokenBalance);
        setBalance(tokenBalance);
    };

    const submitFormSurveyToContract = useCallback(
        async (surveyId: bigint, answers: Uint256[]) => {
            console.log(
                `TOKEN_CONTRACT_ADDRESS ${TOKEN_CONTRACT_ADDRESS}, address ${address} submitFormSurveyToContract`,
                surveyId,
                answers
            );
            const response = await submitSurvey(TOKEN_CONTRACT_ADDRESS, address, surveyId, answers);
            console.log(`SUCCESS BRO`, response);
            updateQUIZBalance(address);
            return response;
        },
        [address]
    );

    return { address, balance, submitFormSurveyToContract };
};
