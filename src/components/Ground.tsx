import * as THREE from 'three';

export const Ground = () => {
    return (
        <mesh 
            rotation={[-Math.PI / 2, 0, 0]} 
            position={[0, -2, 0]} 
            receiveShadow
        >
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial 
                color="#3a5a40"
                roughness={1}
                metalness={0}
            >
                <color attach="color" args={["#3a5a40"]} />
            </meshStandardMaterial>
        </mesh>
    );
}; 