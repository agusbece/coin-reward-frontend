'use client';

import { useCallback, useState } from 'react';

import Modal from '@/components/modal/modal';

const modalText = `Hi, section in maintance! Developed by: `;
const modalTitle = `Survey rewarding dApp`;

export default function Home() {
    const [openModal, setOpenModal] = useState(true);

    const handleClose = useCallback(() => {
        setOpenModal(false);
    }, []); // If setOpenModal never changes, you can leave the dependencies array empty

    return (
        <>
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
        </>
    );
}
