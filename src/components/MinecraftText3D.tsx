import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const MinecraftText3D = () => {
    const textRef = useRef<THREE.Group>(null);

    // Create textures once and reuse them
    const letterTextures = useMemo(() => {
        const text = "MAKAR SANKRANTI";
        return [...text].map(letter => {
            const canvas = document.createElement('canvas');
            canvas.width = 128;
            canvas.height = 128;
            const ctx = canvas.getContext('2d')!;
            
            // Background
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, 128, 128);
            
            // Text shadow
            ctx.fillStyle = '#B76E00';
            ctx.font = 'bold 72px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(letter, 66, 66);
            
            // Main text
            ctx.fillStyle = '#FFD700';
            ctx.fillText(letter, 64, 64);

            const texture = new THREE.CanvasTexture(canvas);
            texture.needsUpdate = true;
            return texture;
        });
    }, []);

    useFrame((state) => {
        if (textRef.current) {
            // Gentle floating animation
            textRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2 + 15;
            // Subtle rotation
            textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
        }
    });

    return (
        <group ref={textRef} position={[0, 15, -5]}>
            {/* Create text using blocks for a Minecraft style */}
            {letterTextures.map((texture, i) => (
                <mesh 
                    key={i} 
                    position={[
                        (i - 7) * 1.5, // Increased spacing
                        Math.sin(i * 0.5) * 0.2, // Slight wave pattern
                        0
                    ]}
                    rotation={[0, 0, Math.sin(i * 0.5) * 0.1]} // Slight rotation
                    castShadow
                >
                    <boxGeometry args={[1.2, 1.2, 0.3]} /> {/* Larger blocks */}
                    <meshStandardMaterial 
                        map={texture}
                        color="#FFD700"
                        metalness={0.8}
                        roughness={0.2}
                        emissive="#FF4500"
                        emissiveIntensity={0.2}
                        transparent
                        opacity={0.9}
                    />
                    {/* Glow effect */}
                    <pointLight
                        color="#FF6B00"
                        intensity={0.5}
                        distance={3}
                        position={[0, 0, 0.5]}
                    />
                </mesh>
            ))}
            {/* Add decorative elements */}
            <mesh position={[-12, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
                <boxGeometry args={[2, 0.3, 0.3]} />
                <meshStandardMaterial color="#FF4500" emissive="#FF4500" />
            </mesh>
            <mesh position={[12, 0, 0]} rotation={[0, 0, -Math.PI / 4]}>
                <boxGeometry args={[2, 0.3, 0.3]} />
                <meshStandardMaterial color="#FF4500" emissive="#FF4500" />
            </mesh>
        </group>
    );
}; 