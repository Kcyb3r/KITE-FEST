import { Sky, Environment as DreiEnvironment } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface EnvironmentProps {
    isNight: boolean;
}

export const Environment: React.FC<EnvironmentProps> = ({ isNight }) => {
    const sunRef = useRef<THREE.Mesh>(null);
    const glowRef = useRef<THREE.PointLight>(null);
    const sunLightRef = useRef<THREE.DirectionalLight>(null);

    useFrame((state) => {
        if (sunRef.current && glowRef.current && sunLightRef.current) {
            const time = state.clock.elapsedTime;
            // Subtle sun movement
            const yPos = Math.sin(time * 0.1) * 0.2 + 20;
            const xPos = Math.cos(time * 0.1) * 10;
            
            sunRef.current.position.set(xPos, yPos, 50);
            glowRef.current.position.set(xPos, yPos, 50);
            sunLightRef.current.position.set(xPos, yPos, 50);
            
            // Update shadow camera to follow sun
            sunLightRef.current.shadow.camera.updateProjectionMatrix();
        }
    });

    return (
        <>
            <Sky 
                sunPosition={isNight ? [-100, -20, -100] : [50, 20, 50]} 
                turbidity={isNight ? 0.3 : 0.1}
                rayleigh={isNight ? 0.5 : 0.3}
                mieCoefficient={0.003}
                mieDirectionalG={0.9}
                exposure={isNight ? 0.3 : 1.5}
            />
            <DreiEnvironment preset={isNight ? "night" : "sunset"} />
            
            {/* Sun/Moon sphere with enhanced glow */}
            <mesh ref={sunRef} position={[50, 20, 50]}>
                <sphereGeometry args={[5, 32, 32]} />
                <meshBasicMaterial color={isNight ? "#FFFFFF" : "#FDB813"}>
                    <color attach="color" args={[isNight ? "#E1E1E1" : "#FFF5E0"]} />
                </meshBasicMaterial>
                <pointLight 
                    ref={glowRef}
                    color={isNight ? "#E1E1E1" : "#FFF5E0"}
                    intensity={isNight ? 1 : 2}
                    distance={200}
                    decay={1}
                />
            </mesh>
            
            {/* Main directional light */}
            <directionalLight
                ref={sunLightRef}
                position={[50, 20, 50]}
                intensity={isNight ? 0.2 : 2.5}
                castShadow
                shadow-mapSize={[4096, 4096]}
                shadow-camera-far={100}
                shadow-camera-near={1}
                shadow-camera-left={-50}
                shadow-camera-right={50}
                shadow-camera-top={50}
                shadow-camera-bottom={-50}
                shadow-bias={-0.0001}
                shadow-radius={1}
            >
                <orthographicCamera attach="shadow-camera" args={[-50, 50, 50, -50, 1, 100]} />
            </directionalLight>
            
            {/* Ambient light */}
            <ambientLight intensity={isNight ? 0.1 : 0.4} />
            
            {/* Ground fill light */}
            <hemisphereLight
                skyColor={isNight ? "#1a1a2e" : "#FFF5E0"}
                groundColor={isNight ? "#000000" : "#FFE5B4"}
                intensity={isNight ? 0.2 : 0.6}
            />

            {/* Night-time building lights */}
            {isNight && (
                <>
                    <pointLight
                        position={[0, 10, 0]}
                        color="#FFA500"
                        intensity={1}
                        distance={50}
                        decay={2}
                    />
                    <pointLight
                        position={[-20, 10, -20]}
                        color="#FFD700"
                        intensity={1}
                        distance={40}
                        decay={2}
                    />
                    <pointLight
                        position={[20, 10, 20]}
                        color="#FFA07A"
                        intensity={1}
                        distance={40}
                        decay={2}
                    />
                </>
            )}
        </>
    );
}; 