import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PersonProps {
    position: [number, number, number];
    rotation?: number;
}

export const Person: React.FC<PersonProps> = ({ position, rotation = 0 }) => {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            // Subtle swaying animation
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1 + rotation;
        }
    });

    return (
        <group ref={groupRef} position={position}>
            {/* Body */}
            <mesh position={[0, 1, 0]}>
                <capsuleGeometry args={[0.2, 1, 4, 8]} />
                <meshStandardMaterial color="#444" />
            </mesh>
            {/* Head */}
            <mesh position={[0, 1.8, 0]}>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshStandardMaterial color="#ffdbac" />
            </mesh>
            {/* Arms */}
            <mesh position={[0, 1.4, 0]} rotation={[0, 0, Math.PI / 4]}>
                <capsuleGeometry args={[0.08, 0.8, 4, 8]} />
                <meshStandardMaterial color="#444" />
            </mesh>
            {/* Kite String */}
            <line>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={2}
                        array={new Float32Array([0, 1.5, 0, 0, 4, -2])}
                        itemSize={3}
                    />
                </bufferGeometry>
                <lineBasicMaterial color="white" linewidth={1} />
            </line>
        </group>
    );
}; 