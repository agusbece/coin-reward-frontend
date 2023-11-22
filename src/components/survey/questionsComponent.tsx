'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Alert } from '@mui/material';
import Web3 from 'web3';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

import WalletInfo from '../wallet-info/wallet-info';
import { useEthereum } from '@/hooks/useEthereum';

declare global {
    interface Window {
        ethereum: any;
    }
}

import surveyJson from '../../../survey-sample.json';
import { Question } from '@/models/question';
import { ethers } from 'ethers';
import { reverse } from 'dns';

const questions = surveyJson.questions;

interface QuestionsComponentProps {
    questions: Question[];
    saveAnswers: (answers: string[]) => void;
}

const answers: string[] = [];

const QuestionsComponent = ({ questions, saveAnswers }: QuestionsComponentProps) => {
    const { register, handleSubmit, setValue, watch } = useForm();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const currentQuestion = questions[currentQuestionIndex];
    const [timer, setTimer] = useState(currentQuestion.lifetimeSeconds);

    const answer = watch('answer');
    const answerRef = useRef(answer);

    // Update the ref whenever the answer changes
    useEffect(() => {
        answerRef.current = answer;
    }, [answer]);

    const onSurveyComplete = (data: any) => {
        console.log(data);
    };

    useEffect(() => {
        if (currentQuestionIndex !== questions.length) {
            setValue('answer', '');
            setTimer(currentQuestion.lifetimeSeconds);
        }

        const countdown = setInterval(() => {
            setTimer((t) => t - 1);
        }, 1000);

        const timeout = setTimeout(() => {
            console.log(`answerRef.current TIMED OUT =>`, answerRef.current);

            if (answerRef.current === '') {
                // If no answer selected, set answer to MaxUint256
                // setAnswers((prevAnswers) => [...prevAnswers, ethers.MaxUint256.toString()]);
                answers.push(ethers.MaxUint256.toString());
            } else {
                // setAnswers((prevAnswers) => [...prevAnswers, answerRef.current]);
                answers.push(answerRef.current);
            }

            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex((currentIndex) => currentIndex + 1);
            } else {
                onSurveyComplete('timeout'); // or handle timeout differently
                finishQuestions();
            }
        }, currentQuestion.lifetimeSeconds * 1000);

        return () => {
            clearInterval(countdown);
            clearTimeout(timeout);
        };
    }, [currentQuestionIndex, setValue, currentQuestion]);

    const onSubmit = (data: any) => {
        console.log(`DATA => `, data);
        if (data === '') {
            // If no answer selected, set answer to MaxUint256
            // setAnswers((prevAnswers) => [...prevAnswers, ethers.MaxUint256.toString()]);
            answers.push(ethers.MaxUint256.toString());
        } else {
            // setAnswers((prevAnswers) => [...prevAnswers, data.answer]);
            answers.push(answerRef.current);
        }
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((currentIndex) => currentIndex + 1);
        } else {
            finishQuestions();
        }
    };

    const finishQuestions = () => {
        saveAnswers(answers);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ marginBottom: '1rem' }} alignItems={'center'}>
                <Box alignItems={'flex-end'}>
                    <p>Time remaining: {timer}</p>
                </Box>
                <Box sx={{ maxWidth: '50%' }}>
                    <img src={currentQuestion.image} alt={`Question ${currentQuestionIndex + 1}`} />
                </Box>
                <Typography variant="h6">{currentQuestion.text}</Typography>
            </Box>
            {currentQuestion.options.map((option, index) => (
                <Box key={index} sx={{ marginBottom: '0.5rem' }}>
                    <input
                        {...register('answer', { required: false })}
                        type="radio"
                        value={index}
                        id={`answer_${index}`}
                    />
                    <label htmlFor={`answer_${index}`}>{option.text}</label>
                </Box>
            ))}
            <Box alignItems={'flex-end'}>
                <Button type="submit" variant="contained" color="secondary">
                    {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Submit'}
                </Button>
            </Box>
            {/* <img src={currentQuestion.image} alt={`Question ${currentQuestionIndex + 1}`} />
            <div>
                <div>Time remaining: {timer}</div>
                <h2>{currentQuestion.text}</h2>
            </div>
            {currentQuestion.options.map((option, index) => (
                <div key={index}>
                    <input
                        {...register('answer', { required: false })}
                        type="radio"
                        value={index}
                        id={`answer_${index}`}
                    />
                    <label htmlFor={`answer_${index}`}>{option.text}</label>
                </div>
            ))}
            <input type="submit" value={currentQuestionIndex < questions.length ? 'Next' : 'Submit'} /> */}
        </form>
    );
};

export default QuestionsComponent;
