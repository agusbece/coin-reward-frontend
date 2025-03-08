import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { device } from '@/styles/mediaQueries';
// import WalletConnectionBtns from "./WalletConnectionBtns";

const Navbar = () => {
    const router = useRouter();

    const goToHomeScreen = () => {
        router.push({ pathname: '/' });
    };

    return (
        <NavbarContainer>
            <LogoContainer onClick={goToHomeScreen}>
                <Image fill src="/logo.png" alt="Logo" />
            </LogoContainer>
            {/* <WalletConnectionBtns /> */}
        </NavbarContainer>
    );
};

export default Navbar;

/*
Styles
*/

const NavbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    flex-direction: row;
    padding: 24px 48px;
    @media ${device.tablet} {
        padding: 24px 24px;
    }
    @media ${device.tabletS} {
        flex-direction: column;
        align-items: stretch;
    }
    @media ${device.mobileS} {
        padding: 12px 12px;
    }
    @media ${device.mobileXS} {
        padding: 6px 6px;
    }
`;

const LogoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    width: 160px;
    height: 45px;
    cursor: pointer;
    @media ${device.tabletS} {
        margin-bottom: 20px;
    }
`;
