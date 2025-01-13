import * as THREE from 'three';

interface HouseProps {
    position: [number, number, number];
    size?: number;
    color?: string;
    isNight?: boolean;
}

export const MinecraftHouse: React.FC<HouseProps> = ({ 
    position, 
    size = 1,
    color = '#cc8e35',
    isNight = false
}) => {
    return (
        <group position={position}>
            {/* Main house structure - moved down to ground level */}
            <mesh position={[0, size * 2, 0]}>
                <boxGeometry args={[size * 4, size * 4, size * 4]} />
                <meshStandardMaterial color={color} />
            </mesh>

            {/* Foundation/Base */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[size * 4.2, size * 0.2, size * 4.2]} />
                <meshStandardMaterial color="#8B4513" />
            </mesh>

            {/* Roof */}
            <group position={[0, size * 4, 0]}>
                {Array.from({ length: 5 }).map((_, i) => (
                    <mesh key={i} position={[0, i * 0.2, 0]} scale={[1 - i * 0.15, 0.2, 1 - i * 0.15]}>
                        <boxGeometry args={[size * 4.5, 1, size * 4.5]} />
                        <meshStandardMaterial color="#8B4513" />
                    </mesh>
                ))}
            </group>

            {/* Windows with lights */}
            {Array.from({ length: 4 }).map((_, i) => (
                <group key={i}>
                    <mesh position={[size * 1.2, size * 2.5, size * 2.01]}>
                        <boxGeometry args={[size * 0.8, size * 0.8, 0.1]} />
                        <meshStandardMaterial 
                            color="#87CEEB"
                            emissive={isNight ? "#FFD700" : "#000000"}
                            emissiveIntensity={isNight ? 0.5 : 0}
                        />
                    </mesh>
                    {isNight && (
                        <pointLight
                            position={[size * 1.2, size * 2.5, size * 2.5]}
                            color="#FFD700"
                            intensity={0.5}
                            distance={5}
                            decay={2}
                        />
                    )}
                </group>
            ))}

            {/* Door with light */}
            <mesh position={[0, size * 1.2, size * 2.01]}>
                <boxGeometry args={[size * 1.2, size * 2, 0.1]} />
                <meshStandardMaterial color="#4A2810" />
            </mesh>
            {isNight && (
                <pointLight
                    position={[0, size * 0.5, size * 2.5]}
                    color="#FFA500"
                    intensity={0.3}
                    distance={3}
                    decay={2}
                />
            )}

            {/* Terrace railing */}
            {Array.from({ length: 4 }).map((_, i) => (
                <mesh key={i} position={[size * 2 - i * 1.33, size * 4.1, size * 2]}>
                    <boxGeometry args={[0.1, 0.5, 0.1]} />
                    <meshStandardMaterial color="#8B4513" />
                </mesh>
            ))}
            <mesh position={[0, size * 4.3, size * 2]}>
                <boxGeometry args={[size * 4, 0.1, 0.1]} />
                <meshStandardMaterial color="#8B4513" />
            </mesh>
        </group>
    );
}; 