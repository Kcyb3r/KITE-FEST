import * as THREE from 'three';

interface MarketStallProps {
    position: [number, number, number];
    rotation?: number;
    color?: string;
}

export const MinecraftMarketStall: React.FC<MarketStallProps> = ({ 
    position, 
    rotation = 0,
    color = '#8B4513'
}) => {
    return (
        <group position={position} rotation={[0, rotation, 0]}>
            {/* Stall base */}
            <mesh position={[0, 0.1, 0]}>
                <boxGeometry args={[2.5, 0.2, 2]} />
                <meshStandardMaterial color={color} />
            </mesh>

            {/* Counter */}
            <mesh position={[0, 0.6, 0.7]}>
                <boxGeometry args={[2.5, 0.8, 0.6]} />
                <meshStandardMaterial color="#A0522D" />
            </mesh>

            {/* Roof supports */}
            <mesh position={[-1.1, 1.5, 0]}>
                <boxGeometry args={[0.2, 2, 0.2]} />
                <meshStandardMaterial color="#6B4423" />
            </mesh>
            <mesh position={[1.1, 1.5, 0]}>
                <boxGeometry args={[0.2, 2, 0.2]} />
                <meshStandardMaterial color="#6B4423" />
            </mesh>

            {/* Roof */}
            <mesh position={[0, 2.5, 0]} rotation={[0.2, 0, 0]}>
                <boxGeometry args={[3, 0.2, 2.5]} />
                <meshStandardMaterial color="#8B4513" />
            </mesh>

            {/* Display items - random colorful blocks */}
            {Array.from({ length: 3 }).map((_, i) => (
                <mesh key={i} position={[-0.8 + i * 0.8, 1.1, 0.7]}>
                    <boxGeometry args={[0.4, 0.4, 0.4]} />
                    <meshStandardMaterial color={`hsl(${i * 120}, 70%, 50%)`} />
                </mesh>
            ))}
        </group>
    );
}; 