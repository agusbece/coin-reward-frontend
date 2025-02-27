import { createContext } from 'react';
import { useWallet } from '../../hooks/useWallet';

export interface EthereumContextProps {
    // Define the properties and methods of the Ethereum context
    address: string;
    balance: string;
    submitFormSurveyToContract: (surveyId: bigint, answers: string[]) => Promise<void>;
}

export const EthereumContext = createContext<EthereumContextProps | null>(null);

export const EthereumProvider = ({ children }: { children: React.ReactNode }) => {
    const ethereum = useWallet();

    return <EthereumContext.Provider value={ethereum}>
        {ethereum.isConnected.current ? children : "Wallet is not connected to the correct network"}
    </EthereumContext.Provider>;
};
