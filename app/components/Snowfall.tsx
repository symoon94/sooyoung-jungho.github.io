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

            // 파티클 생성 확률을 더 낮춤 (0.95 → 0.98)
            if (particles.length < maxParticles && Math.random() > 0.98) {
                const isLine = Math.random() < 0.5;

                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: isLine ? 0.1 : Math.random() * 1.5 + 0.5, // 점 크기 범위 조정
                    life: Math.random() * 40 + 30, // 수명 증가 (10-30 → 30-70)
                    type: isLine ? 'line' : 'dot',
                    height: isLine ? Math.random() * 50 + 30 : undefined
                });
            }

            // 파티클 그리기 및 업데이트
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];

                ctx.fillStyle = `rgba(0, 0, 0, ${Math.min(p.life / 30, 0.4)})`; // 투명도 변화 속도 조정

                if (p.type === 'dot') {
                    // 비정형 점 그리기
                    const points = 4 + Math.floor(Math.random() * 3); // 4-6개의 점으로 구성
                    ctx.beginPath();
                    for (let j = 0; j < points; j++) {
                        const angle = (j / points) * Math.PI * 2;
                        const randomRadius = p.size * (0.8 + Math.random() * 0.4); // 반지름에 변화 추가
                        const x = p.x + Math.cos(angle) * randomRadius;
                        const y = p.y + Math.sin(angle) * randomRadius;
                        if (j === 0) {
                            ctx.moveTo(x, y);
                        } else {
                            ctx.lineTo(x, y);
                        }
                    }
                    ctx.closePath();
                    ctx.fill();
                } else {
                    // 라인에 노이즈 효과 추가
                    const segments = 5; // 노이즈 세그먼트 수
                    const height = p.height || 0;
                    const segmentHeight = height / segments;

                    for (let j = 0; j < segments; j++) {
                        const offsetX = (Math.random() - 0.5) * 2; // -1에서 1 사이의 랜덤 오프셋
                        ctx.fillRect(
                            p.x + offsetX,
                            p.y + (j * segmentHeight),
                            p.size,
                            segmentHeight
                        );
                    }
                }

                // 수명 감소 속도를 늦춤
                p.life -= 0.5;

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