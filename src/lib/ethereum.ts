import { web3 } from './web3';
import { ethers } from 'ethers';

import quizABI from '../../contracts/quizABI.json';

const GOERLI_CHAIN_ID_OLD: bigint = 5n; // Hexadecimal for Goerli
const GOERLI_CHAIN_ID: bigint = BigInt(process.env.NEXT_PUBLIC_GOERLI_NETWORK_ID || ''); // Hexadecimal for Goerli

const SEPOLIA_CHAIN_ID: bigint = BigInt(process.env.NEXT_PUBLIC_SEPOLIA_NETWORK_ID || ''); // Hexadecimal for Sepolia

export const connectWallet = async (): Promise<string | null> => {
    if (web3) {
        try {
            const accounts: string[] = await web3.eth.requestAccounts();
            return accounts[0];
        } catch (error) {
            console.error('Failed to connect wallet', error);
            return null;
        }
    } else {
        console.error('Web3 is not initialized');
        return null;
    }
};

export const checkNetworkConnection = async (): Promise<boolean> => {
    if (web3) {
        const chainId = await web3.eth.getChainId();
        return chainId === SEPOLIA_CHAIN_ID;
    } else {
        return false;
    }
};

export const getTokenBalance = async (address: string, tokenContractAddress: string): Promise<string> => {
    const provider = new ethers.BrowserProvider((web3 as any).currentProvider);
    const tokenContract = new ethers.Contract(tokenContractAddress, quizABI, provider);

    try {
        const balance: ethers.BigNumberish = await tokenContract.balanceOf(address);
        return ethers.formatEther(balance);
    } catch (error) {
        console.error('Failed to get token balance', error);
        return '0';
    }
};

export const submitSurvey = async (
    contractAddress: string,
    account: string,
    surveyId: bigint,
    surveyData: string[]
) => {
    const provider = new ethers.BrowserProvider((web3 as any).currentProvider);
    const signer = await provider.getSigner(account);
    const contract = new ethers.Contract(contractAddress, quizABI, signer);

    try {
        const transaction = await contract.submit(surveyId, surveyData);
        await transaction.wait(); // Wait for the transaction to be mined
    } catch (error) {
        console.error('Error submitting survey:', error);
        throw error;
    }
};
