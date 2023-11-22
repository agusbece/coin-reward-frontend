'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import Web3 from 'web3';
import WalletInfo from '../wallet-info/wallet-info';
import { useEthereum } from '@/hooks/useEthereum';

import surveyJson from '../../../survey-sample.json';
import QuestionsComponent from './questionsComponent';
import { Question } from '@/models/question';

declare global {
    interface Window {
        ethereum: any;
    }
}

const Survey: React.FC = () => {
    let web3: Web3 | undefined;

    const { submitFormSurveyToContract } = useEthereum();

    const [answers, setAnswers] = useState<string[] | null>(null);
    const questions: Question[] = surveyJson.questions;
    const [surveyStarted, setSurveyStarted] = useState(false);

    const onSubmit = (data: any) => {
        console.log(data);
        submitFormSurveyToContract(2n, data);
        // submitFormSurveyToContract(2n, ['2', '0', '3', '2', '23']);
    };

    const startSurvey = () => {
        setSurveyStarted(true);
    };

    const finishSurvey = (answers: string[]) => {
        console.log(`Survey finished with answers: `, answers);
        setAnswers(answers);
        setSurveyStarted(false);
    };

    return (
        <>
            {answers && <Button onClick={() => setAnswers(null)}>Delete answers ✸✸✸</Button>}
            <WalletInfo />
            {surveyStarted && !answers ? (
                <QuestionsComponent questions={questions} saveAnswers={finishSurvey} />
            ) : (
                <Button onClick={() => startSurvey()}>Start survey</Button>
            )}
            {answers && !surveyStarted && <Button onClick={() => onSubmit(answers)}>Submit survey</Button>}
        </>
    );
};

export default Survey;
