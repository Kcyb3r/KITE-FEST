import * as THREE from 'three';

interface StreetLightsProps {
    isNight: boolean;
}

export const MinecraftStreetLights: React.FC<StreetLightsProps> = ({ isNight }) => {
    return (
        <group>
            {/* Street Lights */}
            {[
                [-10, 0, -10],
                [10, 0, -10],
                [-10, 0, 10],
                [10, 0, 10],
                [0, 0, 0],
                [-20, 0, 0],
                [20, 0, 0],
                [0, 0, -20],
                [0, 0, 20]
            ].map((position, index) => (
                <group key={index} position={position as [number, number, number]}>
                    {/* Lamp post */}
                    <mesh position={[0, 3, 0]}>
                        <cylinderGeometry args={[0.1, 0.1, 6, 8]} />
                        <meshStandardMaterial color="#4A4A4A" />
                    </mesh>
                    
                    {/* Lamp head */}
                    <mesh position={[0, 6, 0]}>
                        <boxGeometry args={[0.6, 0.3, 0.6]} />
                        <meshStandardMaterial 
                            color={isNight ? "#FFD700" : "#A0A0A0"}
                            emissive={isNight ? "#FFD700" : "#000000"}
                            emissiveIntensity={isNight ? 1 : 0}
                        />
                    </mesh>

                    {/* Light source */}
                    {isNight && (
                        <pointLight
                            position={[0, 5.8, 0]}
                            color="#FFD700"
                            intensity={1}
                            distance={10}
                            decay={2}
                        />
                    )}
                </group>
            ))}
        </group>
    );
}; 