import styled from 'styled-components';

const BlurredBox = styled.div`
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 15px 25px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    font-family: 'Minecraft', monospace;
    font-size: 14px;
    z-index: 1000;
    pointer-events: none;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateZ(0);
`;

const GradientText = styled.span`
    background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-weight: bold;
`;

export const CreditsBox = () => {
    return (
        <BlurredBox>
            Made by <GradientText>Kcyb3r_</GradientText>
        </BlurredBox>
    );
}; 