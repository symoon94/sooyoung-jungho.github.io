'use client';

import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    size: number;
    life: number;
    type: 'dot' | 'line';
    height?: number; // 라인용 높이
}

export default function Snowfall() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        container.appendChild(canvas);

        const particles: Particle[] = [];
        const maxParticles = 30;

        const animate = () => {
            if (!ctx) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 새로운 파티클 생성
            if (particles.length < maxParticles && Math.random() > 0.85) {
                // 50% 확률로 라인 생성, 50% 확률로 점 생성
                const isLine = Math.random() < 0.5;

                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: isLine ? 0.2 : Math.random() * 1 + 1, // 라인은 더 얇게
                    life: Math.random() * 20 + 10,
                    type: isLine ? 'line' : 'dot',
                    height: isLine ? Math.random() * 20 + 10 : undefined // 라인 높이: 10-30px
                });
            }

            // 파티클 그리기 및 업데이트
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];

                ctx.fillStyle = `rgba(0, 0, 0, ${Math.min(p.life / 10, 0.4)})`;

                if (p.type === 'dot') {
                    // 원형 파티클 그리기
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fill();
                } else {
                    // 세로선 그리기
                    ctx.fillRect(p.x, p.y, p.size, p.height || 0);
                }

                p.life--;

                if (p.life <= 0) {
                    particles.splice(i, 1);
                }
            }

            requestAnimationFrame(animate);
        };

        animate();

        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('resize', resize);
            container.removeChild(canvas);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 0,
                pointerEvents: 'none',
                mixBlendMode: 'multiply',
                opacity: 0.6
            }}
        />
    );
} 