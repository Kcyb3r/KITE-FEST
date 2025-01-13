import * as THREE from 'three';

interface BuildingProps {
    position: [number, number, number];
    size?: number;
    height?: number;
    color?: string;
}

export const MinecraftBuilding: React.FC<BuildingProps> = ({ 
    position, 
    size = 1,
    height = 1,
    color = '#8B4513'
}) => {
    return (
        <group position={position}>
            {/* Main building structure */}
            <mesh position={[0, height * 2, 0]}>
                <boxGeometry args={[size * 6, height * 8, size * 6]} />
                <meshStandardMaterial color={color} />
            </mesh>

            {/* Windows */}
            {Array.from({ length: 5 }).map((_, floor) =>
                Array.from({ length: 4 }).map((_, window) => (
                    <mesh 
                        key={`${floor}-${window}`}
                        position={[
                            (window - 1.5) * 1.2 * size,
                            floor * 2 + 2,
                            size * 3.01
                        ]}
                    >
                        <boxGeometry args={[size * 0.8, size * 0.8, 0.1]} />
                        <meshStandardMaterial 
                            color="#87CEEB"
                            emissive="#87CEEB"
                            emissiveIntensity={0.2}
                        />
                    </mesh>
                ))
            )}

            {/* Roof */}
            <mesh position={[0, height * 6, 0]}>
                <boxGeometry args={[size * 6.5, size * 0.5, size * 6.5]} />
                <meshStandardMaterial color="#4A4A4A" />
            </mesh>
        </group>
    );
}; 