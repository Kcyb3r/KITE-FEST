import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MinecraftPersonProps {
    position: [number, number, number];
    rotation?: number;
}

export const MinecraftPerson: React.FC<MinecraftPersonProps> = ({ position, rotation = 0 }) => {
    const groupRef = useRef<THREE.Group>(null);
    const armRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (groupRef.current && armRef.current) {
            // Subtle body movement
            groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.05;
            
            // Arm movement for holding kite string
            armRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
        }
    });

    return (
        <group ref={groupRef} position={position} rotation={[0, rotation, 0]}>
            {/* Head */}
            <mesh position={[0, 1.6, 0]}>
                <boxGeometry args={[0.4, 0.4, 0.4]} />
                <meshStandardMaterial color="#ffdbac" />
            </mesh>

            {/* Body */}
            <mesh position={[0, 1, 0]}>
                <boxGeometry args={[0.4, 0.6, 0.2]} />
                <meshStandardMaterial color="#3b5998" />
            </mesh>

            {/* Arms - one raised for holding kite */}
            <mesh ref={armRef} position={[0.3, 1.3, 0]} rotation={[Math.PI * 0.7, 0, Math.PI * 0.1]}>
                <boxGeometry args={[0.2, 0.6, 0.2]} />
                <meshStandardMaterial color="#3b5998" />
            </mesh>
            <mesh position={[-0.3, 1.1, 0]} rotation={[0, 0, -Math.PI * 0.1]}>
                <boxGeometry args={[0.2, 0.6, 0.2]} />
                <meshStandardMaterial color="#3b5998" />
            </mesh>

            {/* Legs in standing position */}
            <mesh position={[0.1, 0.5, 0]}>
                <boxGeometry args={[0.2, 0.6, 0.2]} />
                <meshStandardMaterial color="#1a237e" />
            </mesh>
            <mesh position={[-0.1, 0.5, 0]}>
                <boxGeometry args={[0.2, 0.6, 0.2]} />
                <meshStandardMaterial color="#1a237e" />
            </mesh>
        </group>
    );
}; 