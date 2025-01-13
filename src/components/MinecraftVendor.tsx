import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface VendorProps {
    position: [number, number, number];
    rotation?: number;
    color?: string;
}

export const MinecraftVendor: React.FC<VendorProps> = ({ 
    position, 
    rotation = 0,
    color = '#3b5998'
}) => {
    const armRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (armRef.current) {
            // Vendor arm movement
            armRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 2) * 0.2;
        }
    });

    return (
        <group position={position} rotation={[0, rotation, 0]}>
            {/* Head */}
            <mesh position={[0, 1.4, 0]}>
                <boxGeometry args={[0.4, 0.4, 0.4]} />
                <meshStandardMaterial color="#ffdbac" />
            </mesh>

            {/* Body */}
            <mesh position={[0, 0.9, 0]}>
                <boxGeometry args={[0.4, 0.5, 0.2]} />
                <meshStandardMaterial color={color} />
            </mesh>

            {/* Arms */}
            <mesh ref={armRef} position={[0.3, 1.1, 0]}>
                <boxGeometry args={[0.2, 0.5, 0.2]} />
                <meshStandardMaterial color={color} />
            </mesh>
            <mesh position={[-0.3, 1.1, 0]}>
                <boxGeometry args={[0.2, 0.5, 0.2]} />
                <meshStandardMaterial color={color} />
            </mesh>

            {/* Legs */}
            <mesh position={[0.1, 0.4, 0]}>
                <boxGeometry args={[0.2, 0.6, 0.2]} />
                <meshStandardMaterial color="#1a237e" />
            </mesh>
            <mesh position={[-0.1, 0.4, 0]}>
                <boxGeometry args={[0.2, 0.6, 0.2]} />
                <meshStandardMaterial color="#1a237e" />
            </mesh>
        </group>
    );
}; 