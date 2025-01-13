export interface KiteProps {
    position: [number, number, number];
    personPosition: [number, number, number];
    color: string;
    size?: number;
    rotation?: number;
}

export interface ParticleProps {
    position: [number, number, number];
    color: string;
}

export interface SceneProps {
    children: React.ReactNode;
} 