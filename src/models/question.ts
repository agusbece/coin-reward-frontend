import fs from 'fs';

// Step 1: Read and parse the survey-sample.json file
const surveyData = fs.readFileSync('survey-sample.json', 'utf-8');
const questions = JSON.parse(surveyData).questions;

// Step 2: Define the structure of the Question model
export interface Question {
    image: string;
    lifetimeSeconds: number;
    options: Option[];
    text: string;
}

interface Option {
    text: string;
}
