import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { KiteProps } from '../types';
import { gsap } from 'gsap';

export const Kite: React.FC<KiteProps> = ({ position, color, size = 1, rotation = 0 }) => {
    const kiteRef = useRef<THREE.Mesh>(null);

    useEffect(() => {
        if (kiteRef.current) {
            gsap.to(kiteRef.current.rotation, {
                y: rotation + Math.PI * 2,
                duration: 5,
                repeat: -1,
                ease: "none"
            });
        }
    }, []);

    useFrame((state) => {
        if (kiteRef.current) {
            kiteRef.current.position.y += Math.sin(state.clock.elapsedTime) * 0.01;
        }
    });

    return (
        <mesh ref={kiteRef} position={position}>
            <tetrahedronGeometry args={[size, 0]} />
            <meshPhongMaterial color={color} shininess={100} />
        </mesh>
    );
}; 