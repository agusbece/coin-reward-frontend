'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';

import Survey from '@/components/survey/survey';

import { EthereumProvider } from './context/wallet.context';
import Modal from '@/components/modal/modal';
import Footer from '@/components/Footer/Footer';

const modalText =
    `Hi, welcome to the survey rewarding dApp where you can earn a few QUIZ by just answering some basic ` +
    `questions. Please note that the survey allows only one participation every 60 minutes. Developed by: `;
const modalTitle = `Survey rewarding dApp`;

const sepoliaFaucetURL = 'https://sepoliafaucet.com/';

export default function Home() {
    const [openModal, setOpenModal] = useState(true);

    const handleClose = useCallback(() => {
        setOpenModal(false);
    }, []); // If setOpenModal never changes, you can leave the dependencies array empty

    return (
        <>
            <EthereumProvider>
                <main className="flex min-h-screen flex-col items-center justify-between pt-24">
                    <Survey></Survey>
                    <Footer />
                </main>
                {openModal && (
                    <Modal handleClose={handleClose} text={modalText} title={modalTitle}>
                        <div className="flex flex-col items-center space-y-4 py-2">
                            <a
                                className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                                href="mailto:becerra.gonzalez.agustin@gmail.com"
                            >
                                becerra.gonzalez.agustin@gmail.com
                            </a>

                            <div
                                className="bg-gray-50 rounded-lg p-4 w-full max-w-md mx-auto border border-gray-200
                                group"
                            >
                                <div className="flex items-center gap-2 mb-4">
                                    <h3 className="text-sm font-medium text-gray-700 leading-7">Requirements:</h3>
                                    <a
                                        href="https://metamask.io/download/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center text-orange-500 hover:text-orange-600 
                                            transition-colors duration-200"
                                    >
                                        <Image
                                            src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
                                            alt="MetaMask"
                                            width={20}
                                            height={20}
                                            className="mr-1"
                                        />
                                        <span className="ml-2 underline hidden group-hover:block">
                                            Install MetaMask extension
                                        </span>
                                    </a>
                                </div>
                                <div className="flex items-center text-sm">
                                    <span className="text-gray-700">& get some Sepolia ETH from any free faucet:</span>
                                    <a
                                        href={sepoliaFaucetURL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="ml-2 text-blue-500 hover:text-blue-700 underline transition-colors 
                                            duration-200"
                                    >
                                        ie
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Modal>
                )}
            </EthereumProvider>
        </>
    );
}
