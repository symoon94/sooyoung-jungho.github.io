'use client';

import { useEffect, useState } from 'react';

interface Flake {
    id: number;
    left: number;
    top: number;
    size: number;
    speed: number;
    imageIndex: number;
    rotateX: number;
    rotateY: number;
    rotateZ: number;
    swaySpeed: number;
}

export default function Snowfall() {
    const [flakes, setFlakes] = useState<Flake[]>([]);
    const images = [
        '/images/f-01.png',
        '/images/f-02.png'
    ];

    useEffect(() => {
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }, []);

    useEffect(() => {
        const createFlake = (): Flake => ({
            id: Math.random(),
            left: Math.random() * 100,
            top: -10,
            size: Math.random() * 15 + 10,
            speed: Math.random() * 0.3 + 0.1,
            imageIndex: Math.floor(Math.random() * images.length),
            rotateX: Math.random() * 360,
            rotateY: Math.random() * 360,
            rotateZ: Math.random() * 360,
            swaySpeed: Math.random() * 2 + 1,
        });

        setFlakes(Array.from({ length: 20 }, createFlake));

        const interval = setInterval(() => {
            setFlakes(prevFlakes => {
                const newFlakes = prevFlakes
                    .map(flake => ({
                        ...flake,
                        top: flake.top + flake.speed,
                        rotateX: flake.rotateX + 0.5,
                        rotateY: flake.rotateY + 0.3,
                        rotateZ: flake.rotateZ + 0.2,
                        left: flake.left + Math.sin(flake.top * 0.05) * 0.1,
                    }))
                    .filter(flake => flake.top < 100)

                while (newFlakes.length < 20) {
                    newFlakes.push(createFlake());
                }

                return newFlakes;
            });
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none perspective-[1000px]">
            {flakes.map(flake => (
                <img
                    key={flake.id}
                    src={images[flake.imageIndex]}
                    className="absolute transition-all duration-300 will-change-transform"
                    style={{
                        left: `${flake.left}%`,
                        top: `${flake.top}%`,
                        width: `${flake.size}px`,
                        height: `${flake.size}px`,
                        transform: `
                            translateZ(${Math.sin(flake.top * 0.05) * 100}px)
                            rotateX(${flake.rotateX}deg)
                            rotateY(${flake.rotateY}deg)
                            rotateZ(${flake.rotateZ}deg)
                        `,
                        opacity: 0.8,
                    }}
                    alt=""
                />
            ))}
        </div>
    );
} 