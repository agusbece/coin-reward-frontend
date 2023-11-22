'use client';

import { useCallback, useState } from 'react';

import Survey from '@/components/survey/survey';

import { EthereumProvider } from './context/wallet.context';
import Modal from '@/components/modal/modal';

const modalText = `Hi, welcome to the survey rewarding dApp. Developed by: `;
const modalTitle = `Survey rewarding dApp`;

export default function Home() {
    const [openModal, setOpenModal] = useState(true);

    // Define your callback using useCallback and specify dependencies
    const handleClose = useCallback(() => {
        setOpenModal(false);
    }, []); // If setOpenModal never changes, you can leave the dependencies array empty

    return (
        <EthereumProvider>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <h1>SURVEY REWARDING dApp</h1>
                <Survey></Survey>
            </main>
            {openModal && (
                <Modal handleClose={handleClose} text={modalText} title={modalTitle}>
                    <a
                        className="px-4 pb-4 pt-5 sm:m-6 sm:mb-4 font-semibold leading-5 h-5 justify-self-center"
                        href="mailto:becerra.gonzalez.agustin@gmail.com"
                    >
                        becerra.gonzalez.agustin@gmail.com
                    </a>
                </Modal>
            )}
        </EthereumProvider>
    );
}
