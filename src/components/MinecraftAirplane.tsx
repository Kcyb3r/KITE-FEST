import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const MinecraftAirplane = () => {
    const planeRef = useRef<THREE.Group>(null);
    const pathRadius = 50;
    const flyingHeight = 30;
    const speed = 0.2;

    useFrame((state) => {
        if (planeRef.current) {
            const time = state.clock.elapsedTime * speed;
            
            // Calculate position on circular path
            const x = Math.cos(time) * pathRadius;
            const z = Math.sin(time) * pathRadius;
            
            // Update position
            planeRef.current.position.set(x, flyingHeight, z);
            
            // Make plane face direction of travel
            planeRef.current.rotation.y = -time;
            
            // Add slight banking effect
            planeRef.current.rotation.z = Math.sin(time) * 0.2;
            planeRef.current.rotation.x = Math.cos(time) * 0.1;
        }
    });

    return (
        <group ref={planeRef}>
            {/* Fuselage */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[4, 1, 1]} />
                <meshStandardMaterial color="#FFFFFF" />
            </mesh>

            {/* Wings */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[2, 0.2, 6]} />
                <meshStandardMaterial color="#DDDDDD" />
            </mesh>

            {/* Tail */}
            <mesh position={[-1.8, 0.5, 0]}>
                <boxGeometry args={[0.5, 1, 1]} />
                <meshStandardMaterial color="#DDDDDD" />
            </mesh>

            {/* Tail wings */}
            <mesh position={[-1.8, 0.5, 0]}>
                <boxGeometry args={[0.5, 0.2, 2]} />
                <meshStandardMaterial color="#DDDDDD" />
            </mesh>

            {/* Windows */}
            {Array.from({ length: 3 }).map((_, i) => (
                <mesh key={i} position={[0.5 - i * 0.8, 0.2, 0]}>
                    <boxGeometry args={[0.3, 0.3, 1.02]} />
                    <meshStandardMaterial 
                        color="#87CEEB"
                        emissive="#87CEEB"
                        emissiveIntensity={0.2}
                    />
                </mesh>
            ))}
        </group>
    );
}; 