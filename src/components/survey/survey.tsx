'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Alert } from '@mui/material';
import Web3 from 'web3';

import WalletInfo from '../wallet-info/wallet-info';

declare global {
    interface Window {
        ethereum: any;
    }
}

type SurveyFormData = {
    name: string;
    age: number;
    feedback: string;
};

const Survey: React.FC = () => {
    let web3: Web3 | undefined;
    const { register, handleSubmit, watch } = useForm<SurveyFormData>();
    const [isFormValid, setIsFormValid] = useState(false);

    const onSubmit = (data: SurveyFormData) => {
        console.log(data);
        // You can perform any further actions with the form data here
    };

    // Watching fields for changes
    const name = watch('name');
    const age = watch('age');
    const feedback = watch('feedback');
    // const { address } = useEthereum();

    const handleFormChange = () => {
        const isNameValid = Boolean(name);
        const isAgeValid = Boolean(age);
        const isFeedbackValid = Boolean(feedback);

        setIsFormValid(isNameValid && isAgeValid && isFeedbackValid);
    };

    // async function connectWallet() {
    //     try {
    //         const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    //         return accounts[0]; // The primary account
    //     } catch (error) {
    //         console.error("Failed to connect wallet", error);
    //         return null;
    //     }
    // }

    // useEffect(() => {
    //     // Checking if MetaMask is installed
    //     if (typeof window.ethereum === 'undefined') {
    //         alert('Please install MetaMask to use this dApp!');
    //     } else {
    //         const isConnected = connectWallet();
    //     }
    // }, []);

    return (
        <>
            <WalletInfo />
            <form onSubmit={handleSubmit(onSubmit)} onChange={handleFormChange}>
                <TextField
                    {...register('name', { required: true })}
                    label="Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    {...register('age', { required: true })}
                    label="Age"
                    variant="outlined"
                    type="number"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    {...register('feedback', { required: false })}
                    label="Feedback"
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                    margin="normal"
                />
                <Button
                    type="submit"
                    variant="contained"
                    color={isFormValid ? 'success' : 'secondary'}
                    sx={{
                        '&:hover': {
                            backgroundColor: isFormValid ? 'success' : 'secondary',
                        },
                    }}
                >
                    Submit
                </Button>
            </form>
        </>
    );
};

export default Survey;
