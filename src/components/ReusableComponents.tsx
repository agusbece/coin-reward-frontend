import styled from '@emotion/styled';
import { device } from '@/styles/mediaQueries';

export const Break = styled.br``;

export const SurveyTitle = styled.h3`
    font-size: 28px;
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 28px;
    text-decoration: underline;
    @media ${device.tablet} {
        font-size: 24px;
    }
`;

export const DailySurveyTitle = styled(SurveyTitle)`
    text-decoration: none;
`;
