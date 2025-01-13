import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const IndianFlag = () => {
    const flagRef = useRef<THREE.Group>(null);
    const poleRef = useRef<THREE.Mesh>(null);
    const flagMeshRef = useRef<THREE.Mesh>(null);

    // Flag dimensions
    const flagWidth = 15;
    const flagHeight = 10;
    const segments = 50;

    useFrame((state) => {
        if (flagMeshRef.current) {
            const time = state.clock.getElapsedTime();
            const geometry = flagMeshRef.current.geometry as THREE.PlaneGeometry;
            const position = geometry.attributes.position;

            // Animate flag wave effect
            for (let i = 0; i < position.count; i++) {
                const x = position.getX(i);
                const y = position.getY(i);
                
                // Wave animation
                const waveX = Math.sin(x * 0.5 + time * 2) * 0.5;
                const waveY = Math.sin(x * 0.5 + time * 2) * 0.2;
                
                position.setZ(i, waveX + waveY);
            }

            position.needsUpdate = true;
        }
    });

    return (
        <group ref={flagRef} position={[0, 20, -30]}>
            {/* Flag pole */}
            <mesh ref={poleRef} position={[0, 0, 0]} castShadow>
                <cylinderGeometry args={[0.3, 0.4, flagHeight * 3, 16]} />
                <meshStandardMaterial color="#8B4513" metalness={0.5} roughness={0.5} />
            </mesh>

            {/* Flag top ornament */}
            <mesh position={[0, flagHeight * 1.5, 0]} castShadow>
                <sphereGeometry args={[0.5, 16, 16]} />
                <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Flag */}
            <group position={[flagWidth / 2, flagHeight, 0]}>
                {/* Saffron stripe with enhanced material */}
                <mesh 
                    ref={flagMeshRef}
                    position={[0, flagHeight / 3, 0]}
                    castShadow
                    receiveShadow
                >
                    <planeGeometry args={[flagWidth, flagHeight / 3, segments, segments]} />
                    <meshStandardMaterial 
                        color="#FF9933" 
                        side={THREE.DoubleSide}
                        metalness={0.1}
                        roughness={0.8}
                        emissive="#FF9933"
                        emissiveIntensity={0.2}
                    />
                </mesh>

                {/* White stripe with enhanced material */}
                <mesh position={[0, 0, 0]} castShadow receiveShadow>
                    <planeGeometry args={[flagWidth, flagHeight / 3, segments, segments]} />
                    <meshStandardMaterial 
                        color="#FFFFFF" 
                        side={THREE.DoubleSide}
                        metalness={0.1}
                        roughness={0.8}
                        emissive="#FFFFFF"
                        emissiveIntensity={0.1}
                    />
                </mesh>

                {/* Green stripe with enhanced material */}
                <mesh position={[0, -flagHeight / 3, 0]} castShadow receiveShadow>
                    <planeGeometry args={[flagWidth, flagHeight / 3, segments, segments]} />
                    <meshStandardMaterial 
                        color="#138808" 
                        side={THREE.DoubleSide}
                        metalness={0.1}
                        roughness={0.8}
                        emissive="#138808"
                        emissiveIntensity={0.2}
                    />
                </mesh>

                {/* Ashoka Chakra with enhanced visibility */}
                <group position={[0, 0, 0.1]}>
                    {/* Outer ring with glow */}
                    <mesh castShadow>
                        <ringGeometry args={[1.8, 2, 32]} />
                        <meshStandardMaterial 
                            color="#000080" 
                            side={THREE.DoubleSide}
                            emissive="#000080"
                            emissiveIntensity={0.5}
                        />
                    </mesh>
                    
                    {/* Spokes with enhanced material */}
                    {Array.from({ length: 24 }).map((_, i) => (
                        <mesh 
                            key={i} 
                            rotation={[0, 0, (i * Math.PI) / 12]}
                            position={[0, 0, 0.2]}
                            castShadow
                        >
                            <boxGeometry args={[0.1, 1.8, 0.1]} />
                            <meshStandardMaterial 
                                color="#000080"
                                emissive="#000080"
                                emissiveIntensity={0.5}
                                metalness={0.3}
                                roughness={0.7}
                            />
                        </mesh>
                    ))}
                </group>

                {/* Add dedicated lighting for the flag */}
                <pointLight
                    position={[0, 0, 2]}
                    intensity={0.5}
                    distance={5}
                    color="#FFFFFF"
                />
                <spotLight
                    position={[0, 0, 3]}
                    intensity={1}
                    angle={Math.PI / 4}
                    penumbra={0.5}
                    distance={10}
                    color="#FFFFFF"
                    castShadow
                />
            </group>
        </group>
    );
}; 