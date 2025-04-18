'use client';

import React, { useContext, useState } from 'react';
import { Button } from '@mui/material';
import WalletInfo from '../wallet-info/wallet-info';
import { ConnectButton } from '@/components/connect-button/connect-button';

import surveyJson from '../../../survey-sample.json';
import QuestionsComponent from './question/questionsComponent';
import { Question } from '@/models/question';
import { EthereumContext, EthereumContextProps } from '@/app/context/wallet.context';

declare global {
    interface Window {
        ethereum: any;
    }
}

const SURVEY_ID = 2n;

const Survey: React.FC = () => {
    const ethereumContext = useContext(EthereumContext);
    const { isConnected, submitFormSurveyToContract } = ethereumContext as EthereumContextProps;

    const [answers, setAnswers] = useState<string[] | null>(null);
    const questions: Question[] = surveyJson.questions;
    const [surveyStarted, setSurveyStarted] = useState(false);

    const onSubmit = (data: any) => {
        submitFormSurveyToContract(SURVEY_ID, data);
    };

    const startSurvey = () => {
        setAnswers(null);
        setSurveyStarted(true);
    };

    const finishSurvey = (answers: string[]) => {
        setAnswers(answers);
        setSurveyStarted(false);
    };

    return isConnected ? (
        <>
            {answers && <Button onClick={() => setAnswers(null)}>Delete answers ✸✸✸</Button>}
            <WalletInfo />
            {surveyStarted && !answers ? (
                <QuestionsComponent questions={questions} saveAnswers={finishSurvey} />
            ) : (
                <Button variant="contained" onClick={() => startSurvey()}>
                    Start survey
                </Button>
            )}
            {answers && !surveyStarted && <Button onClick={() => onSubmit(answers)}>Submit survey</Button>}
        </>
    ) : (
        <ConnectButton />
    );
};

export default Survey;
