import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Loader } from '@react-three/drei';
import { SceneProps } from '../types';
import { Suspense, useState, useEffect } from 'react';

export const Scene: React.FC<SceneProps> = ({ children }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        // Initial check
        checkMobile();

        // Add resize listener
        window.addEventListener('resize', checkMobile);

        // Cleanup
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <>
            <Canvas 
                camera={{ 
                    position: [0, 15, 30], 
                    fov: 60,
                    near: 0.1,
                    far: 1000
                }}
                shadows
                dpr={[1, 2]}
            >
                <fog attach="fog" args={['#1a1a2e', 5, 50]} />
                <OrbitControls 
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    minDistance={5}
                    maxDistance={100}
                    minPolarAngle={0}
                    maxPolarAngle={Math.PI / 2 - 0.1}
                    minAzimuthAngle={-Math.PI / 2}
                    maxAzimuthAngle={Math.PI / 2}
                    panSpeed={1}
                    zoomSpeed={1}
                    rotateSpeed={0.5}
                    target={[0, 0, 0]}
                    makeDefault
                />
                <Stars 
                    radius={300} 
                    depth={50} 
                    count={5000} 
                    factor={4} 
                    fade={true}
                />
                <Suspense fallback={null}>
                    {children}
                </Suspense>
            </Canvas>
            <Loader />

            {/* Controls Help Overlay - Only show on desktop */}
            {!isMobile && (
                <div style={{
                    position: 'fixed',
                    bottom: 20,
                    left: 20,
                    background: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    fontSize: '14px',
                    zIndex: 1000,
                    pointerEvents: 'none'
                }}>
                    <p>Controls:</p>
                    <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
                        <li>Left Click + Drag: Rotate</li>
                        <li>Right Click + Drag: Pan</li>
                        <li>Scroll or Pinch: Zoom</li>
                    </ul>
                </div>
            )}
        </>
    );
}; 