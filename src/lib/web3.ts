import Web3 from 'web3';

export const web3 = typeof window !== 'undefined' && window.ethereum ? new Web3(window.ethereum) : null;
