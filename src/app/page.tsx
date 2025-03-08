'use client';

import { useCallback, useState } from 'react';

import Survey from '@/components/survey/survey';

import { EthereumProvider } from './context/wallet.context';
import Modal from '@/components/modal/modal';
import Footer from '@/components/Footer/Footer';

const modalText =
    `Hi, welcome to the survey rewarding dApp where you can earn a few QUIZ by just answering some basic ` +
    `questions. Please note that the survey allows only one participation every 60 minutes. Developed by: `;
const modalTitle = `Survey rewarding dApp`;

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
                        <a
                            className="px-4 pb-4 pt-5 sm:m-6 sm:mb-4 font-semibold leading-5 h-5 justify-self-center"
                            href="mailto:becerra.gonzalez.agustin@gmail.com"
                        >
                            becerra.gonzalez.agustin@gmail.com
                        </a>
                    </Modal>
                )}
            </EthereumProvider>
        </>
    );
}
