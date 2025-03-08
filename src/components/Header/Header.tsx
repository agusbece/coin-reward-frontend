import styled from '@emotion/styled';
import Navbar from './Navbar';

const Header = () => {
    return (
        <HeaderContainer>
            <Navbar />
        </HeaderContainer>
    );
};

export default Header;

/*
Styles
*/

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;
