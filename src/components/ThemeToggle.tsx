import styled from 'styled-components';
import { useState } from 'react';

const ToggleButton = styled.button`
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 24px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 30px;
    color: white;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 1000;
    display: flex;
    align-items: center;
    gap: 8px;

    &:hover {
        background: rgba(255, 255, 255, 0.2);
    }

    svg {
        width: 16px;
        height: 16px;
    }
`;

interface ThemeToggleProps {
    onThemeChange: (isNight: boolean) => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ onThemeChange }) => {
    const [isNight, setIsNight] = useState(false);

    const toggleTheme = () => {
        setIsNight(!isNight);
        onThemeChange(!isNight);
    };

    return (
        <ToggleButton onClick={toggleTheme}>
            {isNight ? (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    Day Mode
                </>
            ) : (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                    Night Mode
                </>
            )}
        </ToggleButton>
    );
}; 