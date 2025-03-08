import styled from '@emotion/styled';
import { Break } from '@/components/ReusableComponents';

const FooterDisclaimer = () => {
    return (
        <Disclaimer>
            surveydApp @ Survey Rewarding dApp
            <Break />
            <br></br>
            by Agustin Becerra
        </Disclaimer>
    );
};

export default FooterDisclaimer;

/*
Styles
*/

const Disclaimer = styled.p`
    text-align: center;
`;
