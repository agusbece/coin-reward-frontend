'use client';

import React, { useEffect, useRef, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ethers } from 'ethers';
declare global {
    interface Window {
        ethereum: any;
    }
}

import surveyJson from '../../../../survey-sample.json';
import { Question } from '@/models/question';

const questions = surveyJson.questions;

interface QuestionsComponentProps {
    questions: Question[];
    saveAnswers: (answers: string[]) => void;
}

interface FormData extends FieldValues {
    answer?: string;
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

    useEffect(() => {
        if (currentQuestionIndex !== questions.length) {
            setValue('answer', '');
            setTimer(currentQuestion.lifetimeSeconds);
        }

        const countdown = setInterval(() => {
            setTimer((t) => t - 1);
        }, 1000);

        const timeout = setTimeout(() => {
            if (answerRef.current === '') {
                // If no answer selected, set answer to MaxUint256
                answers.push(ethers.MaxUint256.toString());
            } else {
                answers.push(answerRef.current);
            }

            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex((currentIndex) => currentIndex + 1);
            } else {
                finishQuestions();
            }
        }, currentQuestion.lifetimeSeconds * 1000);

        return () => {
            clearInterval(countdown);
            clearTimeout(timeout);
        };
    }, [currentQuestionIndex, setValue, currentQuestion]);

    const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
        if (data.answer === '') {
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
        <form
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            onSubmit={handleSubmit(onSubmit)}
        >
            <Box sx={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column' }} alignItems={'center'}>
                <Box alignItems={'flex-end'}>
                    <p>Time remaining: {timer}</p>
                </Box>
                <Box sx={{ width: '300px', height: '300px', display: 'flex' }}>
                    <QuestionImage src={currentQuestion.image} alt={`Question ${currentQuestionIndex + 1}`} />
                </Box>
                <Typography variant="h6">{currentQuestion.text}</Typography>
            </Box>
            <QuestionOptions>
                {currentQuestion.options.map((option, index) => (
                    <Box key={index} sx={{ marginBottom: '0.5rem' }}>
                        <input
                            {...register('answer', { required: false })}
                            type="radio"
                            value={index}
                            id={`answer_${index}`}
                        />
                        <label style={{ paddingLeft: '0.5rem' }} htmlFor={`answer_${index}`}>
                            {option.text}
                        </label>
                    </Box>
                ))}
            </QuestionOptions>
            <Box alignItems={'flex-end'}>
                <Button type="submit" variant="contained" color="secondary">
                    {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Submit'}
                </Button>
            </Box>
        </form>
    );
};

export default QuestionsComponent;

const QuestionImage = styled.img`
    border-radius: 2rem;
    border: 0.5rem solid #51a4ff;
    margin: 1rem;
    object-fit: cover;
`;

const QuestionOptions = styled.div`
    display: flex;
    flex-direction: column;
    align-items: baseline;
    justify-content: center;
    margin-bottom: 2rem;
`;
