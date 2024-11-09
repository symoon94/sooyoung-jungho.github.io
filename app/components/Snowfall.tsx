'use client';

import { useEffect, useRef } from 'react';

export default function Snowfall() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // 캔버스 설정
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        container.appendChild(canvas);

        // 필름 노이즈 파티클 설정
        const particles: { x: number; y: number; size: number; life: number }[] = [];
        const maxParticles = 30; // 동시에 존재할 수 있는 최대 파티클 수

        const animate = () => {
            if (!ctx) return;

            // 캔버스 초기화
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 새로운 파티클 생성
            if (particles.length < maxParticles && Math.random() > 0.85) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 1 + 1, // 1-3px 크기
                    life: Math.random() * 20 + 10 // 10-30 프레임 동안 존재
                });
            }

            // 파티클 그리기 및 업데이트
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                
                // 파티클 그리기
                ctx.fillStyle = `rgba(0, 0, 0, ${Math.min(p.life / 10, 0.4)})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                // 수명 감소
                p.life--;

                // 수명이 다한 파티클 제거
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
                opacity: 0.3
            }}
        />
    );
} 