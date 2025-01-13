import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const BLOCK_SIZE = 1;
const WORLD_SIZE = 64;
const CHUNK_SIZE = 16;

export const MinecraftGround = () => {
    const groundRef = useRef<THREE.Group>(null);

    // Create terrain heightmap with Perlin-like noise
    const generateHeight = () => {
        const size = WORLD_SIZE;
        const data = new Float32Array(size * size);
        
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                const index = i * size + j;
                // More varied terrain
                data[index] = Math.sin(i * 0.2) * Math.cos(j * 0.2) * 2 +
                             Math.sin(i * 0.1) * Math.cos(j * 0.1) * 4 +
                             (Math.random() * 0.5 - 0.25);
            }
        }
        return data;
    };

    const heightData = generateHeight();

    // Generate grass and dirt colors
    const getBlockColor = (height: number, x: number, z: number) => {
        if (height > 1) return '#7ec850'; // Grass
        if (height > 0) return '#8b6c42'; // Dirt
        if ((x + z) % 2 === 0) return '#8b6c42'; // Checkerboard pattern
        return '#7a5c32';
    };

    return (
        <group ref={groundRef} position={[-WORLD_SIZE / 2, -5, -WORLD_SIZE / 2]}>
            {/* Generate ground in chunks for better performance */}
            {Array.from({ length: WORLD_SIZE / CHUNK_SIZE }).map((_, chunkX) =>
                Array.from({ length: WORLD_SIZE / CHUNK_SIZE }).map((_, chunkZ) => (
                    <group key={`chunk-${chunkX}-${chunkZ}`}>
                        {Array.from({ length: CHUNK_SIZE }).map((_, x) =>
                            Array.from({ length: CHUNK_SIZE }).map((_, z) => {
                                const worldX = chunkX * CHUNK_SIZE + x;
                                const worldZ = chunkZ * CHUNK_SIZE + z;
                                const height = Math.floor(heightData[worldX * WORLD_SIZE + worldZ]);
                                return (
                                    <mesh 
                                        key={`block-${worldX}-${worldZ}`}
                                        position={[
                                            worldX * BLOCK_SIZE, 
                                            height, 
                                            worldZ * BLOCK_SIZE
                                        ]}
                                        castShadow
                                        receiveShadow
                                    >
                                        <boxGeometry args={[BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE]} />
                                        <meshStandardMaterial 
                                            color={getBlockColor(height, worldX, worldZ)}
                                            roughness={1}
                                            metalness={0}
                                        />
                                    </mesh>
                                );
                            })
                        )}
                    </group>
                ))
            )}
        </group>
    );
}; 