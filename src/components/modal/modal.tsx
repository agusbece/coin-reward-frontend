import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef } from 'react';

export interface ModalProps {
    children?: React.ReactNode;
    handleClose: () => void;
    text?: string;
    title?: string;
}

export default function Modal({ children, handleClose, text, title }: ModalProps) {
    const cancelButtonRef = useRef(null);

    return (
        <Transition.Root as={Fragment} show={true}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={handleClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel
                                className="relative transform overflow-hidden rounded-lg bg-white text-left
                                  shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
                            >
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-xl font-semibold leading-7 text-gray-900"
                                            >
                                                {title}
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="mb-4 text-sm text-gray-500">{text}</p>
                                                {children}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 
                                          py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset 
                                          ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={() => handleClose()}
                                        ref={cancelButtonRef}
                                        type="button"
                                    >
                                        Close
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
