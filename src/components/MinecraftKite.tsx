import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { KiteProps } from '../types';

interface ExtendedKiteProps extends KiteProps {
    personPosition: [number, number, number];
}

export const MinecraftKite: React.FC<ExtendedKiteProps> = ({ position, personPosition, color, size = 1 }) => {
    const kiteRef = useRef<THREE.Group>(null);
    const stringRef = useRef<THREE.BufferGeometry>(null);
    const points = useRef<THREE.Vector3[]>([]);
    const velocity = useRef<THREE.Vector3>(new THREE.Vector3());
    const windForce = useRef<THREE.Vector3>(new THREE.Vector3());
    const numPoints = 15; // More points for smoother string

    // Initialize string points
    useEffect(() => {
        points.current = Array.from({ length: numPoints }, (_, i) => {
            const t = i / (numPoints - 1);
            return new THREE.Vector3(
                personPosition[0] + (position[0] - personPosition[0]) * t,
                personPosition[1] + 1.3 + (position[1] - (personPosition[1] + 1.3)) * t,
                personPosition[2] + (position[2] - personPosition[2]) * t
            );
        });
    }, [position, personPosition]);

    useFrame((state) => {
        if (kiteRef.current && stringRef.current) {
            const time = state.clock.elapsedTime;
            const deltaTime = state.clock.getDelta();

            // Simulate wind with varying direction and strength
            const baseWindStrength = 2;
            const windVariation = Math.sin(time * 0.5) * 0.5 + 0.5;
            const windDirection = new THREE.Vector3(
                Math.sin(time * 0.3) * 0.5,
                Math.sin(time * 0.2) * 0.3,
                Math.cos(time * 0.4) * 0.5
            ).normalize();

            // Apply wind force
            windForce.current.copy(windDirection).multiplyScalar(baseWindStrength * windVariation);

            // Add turbulence
            const turbulence = new THREE.Vector3(
                Math.sin(time * 2) * 0.2,
                Math.sin(time * 3) * 0.1,
                Math.sin(time * 2.5) * 0.2
            );
            windForce.current.add(turbulence);

            // Update velocity with wind force and damping
            velocity.current.add(windForce.current.multiplyScalar(deltaTime));
            velocity.current.multiplyScalar(0.98); // Air resistance

            // Calculate new kite position with constraints
            const newPosition = new THREE.Vector3().copy(kiteRef.current.position);
            newPosition.add(velocity.current);

            // Keep kite within bounds of string length
            const stringLength = position[1]; // Use initial height as max string length
            const toPersonHand = new THREE.Vector3(
                personPosition[0],
                personPosition[1] + 1.3,
                personPosition[2]
            ).sub(newPosition);
            
            if (toPersonHand.length() > stringLength) {
                toPersonHand.setLength(stringLength);
                newPosition.copy(new THREE.Vector3(
                    personPosition[0],
                    personPosition[1] + 1.3,
                    personPosition[2]
                ).sub(toPersonHand));
                
                // Bounce effect when string is fully extended
                velocity.current.multiplyScalar(-0.3);
            }

            // Update kite position and rotation
            kiteRef.current.position.copy(newPosition);

            // Calculate kite orientation based on velocity
            const lookAt = new THREE.Vector3().copy(newPosition).add(velocity.current);
            kiteRef.current.lookAt(lookAt);
            
            // Add wobble to kite
            kiteRef.current.rotation.z = Math.sin(time * 2) * 0.1;
            kiteRef.current.rotation.x += Math.PI / 4; // Tilt kite upward

            // Update string points with catenary curve
            points.current[0].set(personPosition[0], personPosition[1] + 1.3, personPosition[2]);
            points.current[points.current.length - 1].copy(newPosition);

            // Calculate catenary curve for string
            for (let i = 1; i < points.current.length - 1; i++) {
                const t = i / (points.current.length - 1);
                const catenary = Math.cosh(t * 2 - 1) - 1;
                
                points.current[i].lerpVectors(
                    points.current[0],
                    points.current[points.current.length - 1],
                    t
                );
                
                // Add droop and wave effect to string
                points.current[i].y -= catenary * 0.5;
                points.current[i].x += Math.sin(time * 2 + t * Math.PI) * 0.1;
                points.current[i].z += Math.cos(time * 2 + t * Math.PI) * 0.1;
            }

            // Update string geometry
            const positions = new Float32Array(points.current.flatMap(p => [p.x, p.y, p.z]));
            stringRef.current.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        }
    });

    return (
        <group>
            {/* String with increased width for visibility */}
            <line>
                <bufferGeometry ref={stringRef}>
                    <bufferAttribute
                        attach="attributes-position"
                        count={numPoints}
                        array={new Float32Array(numPoints * 3)}
                        itemSize={3}
                    />
                </bufferGeometry>
                <lineBasicMaterial color="#ffffff" linewidth={2} />
            </line>

            <group ref={kiteRef} position={position}>
                {/* Diamond-shaped kite body */}
                <mesh rotation={[0, 0, Math.PI / 4]}>
                    <boxGeometry args={[size * 1.4, size * 1.4, 0.05]} />
                    <meshStandardMaterial color={color} />
                </mesh>

                {/* Cross support */}
                <mesh rotation={[0, 0, Math.PI / 4]} position={[0, 0, 0.03]}>
                    <boxGeometry args={[size * 1.5, 0.05, 0.02]} />
                    <meshStandardMaterial color="#8b4513" />
                </mesh>
                <mesh rotation={[0, 0, -Math.PI / 4]} position={[0, 0, 0.03]}>
                    <boxGeometry args={[size * 1.5, 0.05, 0.02]} />
                    <meshStandardMaterial color="#8b4513" />
                </mesh>

                {/* Dynamic tail */}
                <group position={[0, -size * 0.7, 0]}>
                    {Array.from({ length: 12 }).map((_, i) => (
                        <mesh 
                            key={i} 
                            position={[
                                Math.sin(i * 0.2) * 0.1,
                                -i * 0.15,
                                Math.cos(i * 0.2) * 0.1
                            ]}
                            rotation={[
                                Math.sin(i * 0.3) * 0.2,
                                Math.sin(i * 0.2) * 0.2,
                                Math.PI / 4
                            ]}
                        >
                            <boxGeometry args={[0.1, 0.1, 0.02]} />
                            <meshStandardMaterial 
                                color={color} 
                                transparent 
                                opacity={1 - (i * 0.07)}
                            />
                        </mesh>
                    ))}
                </group>
            </group>
        </group>
    );
}; 