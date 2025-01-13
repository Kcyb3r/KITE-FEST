import { Scene } from './components/Scene';
import { MinecraftGround } from './components/MinecraftGround';
import { MinecraftPerson } from './components/MinecraftPerson';
import { MinecraftKite } from './components/MinecraftKite';
import { Environment } from './components/Environment';
import { useEffect, Suspense, Component, ReactNode } from 'react';
import { MinecraftHouse } from './components/MinecraftHouse';
import styled from 'styled-components';
import { MinecraftMarketStall } from './components/MinecraftMarketStall';
import { MinecraftVendor } from './components/MinecraftVendor';
import { MinecraftText3D } from './components/MinecraftText3D';
import { MinecraftBuilding } from './components/MinecraftBuilding';
import { MinecraftAirplane } from './components/MinecraftAirplane';
import { CreditsBox } from './components/CreditsBox';
import { IndianFlag } from './components/IndianFlag';
import { ThemeToggle } from './components/ThemeToggle';
import { useState } from 'react';
import { MinecraftStreetLights } from './components/MinecraftStreetLights';

const AppContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    touch-action: none;
`;

// Custom Error Boundary Component
class ErrorBoundary extends Component<
    { children: ReactNode },
    { hasError: boolean; error: Error | null }
> {
    constructor(props: { children: ReactNode }) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ 
                    color: 'white', 
                    padding: '20px', 
                    textAlign: 'center' 
                }}>
                    <h2>Something went wrong</h2>
                    <pre style={{ color: '#ff4655' }}>
                        {this.state.error?.message}
                    </pre>
                    <button 
                        onClick={() => window.location.reload()}
                        style={{
                            padding: '8px 16px',
                            background: '#ff4655',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            marginTop: '10px'
                        }}
                    >
                        Refresh Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

const App = () => {
    const [isNight, setIsNight] = useState(false);

    useEffect(() => {
        const preventDefault = (e: Event) => e.preventDefault();
        document.addEventListener('touchmove', preventDefault, { passive: false });
        document.addEventListener('gesturestart', preventDefault);
        
        return () => {
            document.removeEventListener('touchmove', preventDefault);
            document.removeEventListener('gesturestart', preventDefault);
        };
    }, []);

    return (
        <ErrorBoundary>
            <AppContainer className="no-select">
                <Scene>
                    <Suspense fallback={null}>
                        <Environment isNight={isNight} />
                        <IndianFlag />
                        <MinecraftText3D />
                        <MinecraftGround />
                        <MinecraftStreetLights isNight={isNight} />
                        
                        {/* First house and person */}
                        <MinecraftHouse position={[-8, -1, -8]} size={1.2} color="#cc8e35" isNight={isNight} />
                        <MinecraftPerson position={[-8, 3.8, -6]} rotation={Math.PI / 6} />
                        <MinecraftKite 
                            position={[-7, 11, -5]} 
                            personPosition={[-8, 3.8, -6]} 
                            color="#ff4655" 
                            size={1} 
                        />
                        
                        {/* Second house and person */}
                        <MinecraftHouse position={[8, -1, -6]} size={1} color="#d4a056" isNight={isNight} />
                        <MinecraftPerson position={[8, 3, -4]} rotation={-Math.PI / 4} />
                        <MinecraftKite 
                            position={[9, 10, -3]} 
                            personPosition={[8, 3, -4]} 
                            color="#00ff88" 
                            size={0.8} 
                        />
                        
                        {/* Third house and person */}
                        <MinecraftHouse position={[0, -1, -12]} size={1.1} color="#bc7e2d" isNight={isNight} />
                        <MinecraftPerson position={[0, 3.4, -10]} rotation={0} />
                        <MinecraftKite 
                            position={[0, 12, -9]} 
                            personPosition={[0, 3.4, -10]} 
                            color="#ffaa00" 
                            size={1.2} 
                        />
                        
                        {/* Fourth house and person */}
                        <MinecraftHouse position={[-12, -1, 0]} size={1.15} color="#c68b3c" isNight={isNight} />
                        <MinecraftPerson position={[-12, 3.6, 2]} rotation={Math.PI / 3} />
                        <MinecraftKite 
                            position={[-11, 11, 3]} 
                            personPosition={[-12, 3.6, 2]} 
                            color="#00aaff" 
                            size={0.9} 
                        />
                        
                        {/* Market Area */}
                        <group position={[0, -1, 0]}>
                            {/* Row of stalls */}
                            <MinecraftMarketStall position={[-4, 0, 4]} rotation={Math.PI} />
                            <MinecraftVendor position={[-4, 0, 3]} rotation={Math.PI} color="#5d4037" />
                            
                            <MinecraftMarketStall position={[0, 0, 4]} rotation={Math.PI} color="#795548" />
                            <MinecraftVendor position={[0, 0, 3]} rotation={Math.PI} color="#4e342e" />
                            
                            <MinecraftMarketStall position={[4, 0, 4]} rotation={Math.PI} color="#8d6e63" />
                            <MinecraftVendor position={[4, 0, 3]} rotation={Math.PI} color="#3e2723" />

                            {/* Opposite row */}
                            <MinecraftMarketStall position={[-4, 0, 8]} />
                            <MinecraftVendor position={[-4, 0, 9]} color="#6d4c41" />
                            
                            <MinecraftMarketStall position={[0, 0, 8]} color="#a1887f" />
                            <MinecraftVendor position={[0, 0, 9]} color="#5d4037" />
                            
                            <MinecraftMarketStall position={[4, 0, 8]} color="#8d6e63" />
                            <MinecraftVendor position={[4, 0, 9]} color="#4e342e" />

                            {/* Customers walking around */}
                            <MinecraftVendor position={[-2, 0, 6]} rotation={Math.PI / 4} color="#1565c0" />
                            <MinecraftVendor position={[2, 0, 6]} rotation={-Math.PI / 4} color="#0d47a1" />
                            <MinecraftVendor position={[0, 0, 5]} rotation={Math.PI / 2} color="#1976d2" />
                        </group>

                        {/* Additional Buildings */}
                        <group position={[0, -1, 0]}>
                            <MinecraftBuilding 
                                position={[-20, 0, -15]} 
                                size={1.2} 
                                height={1.5}
                                color="#8B8B8B" 
                            />
                            <MinecraftBuilding 
                                position={[20, 0, -12]} 
                                size={1} 
                                height={1.2}
                                color="#A0522D" 
                            />
                            <MinecraftBuilding 
                                position={[-15, 0, 15]} 
                                size={1.3} 
                                height={1.4}
                                color="#6B4423" 
                            />
                            <MinecraftBuilding 
                                position={[18, 0, 15]} 
                                size={1.1} 
                                height={1.3}
                                color="#8B7355" 
                            />
                        </group>

                        {/* Airplane */}
                        <MinecraftAirplane />
                    </Suspense>
                </Scene>
                <ThemeToggle onThemeChange={setIsNight} />
                <CreditsBox />
            </AppContainer>
        </ErrorBoundary>
    );
};

export default App; 