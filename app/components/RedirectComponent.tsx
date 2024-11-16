'use client';

import { useEffect, useRef, useState } from 'react';

// 인트로 애니메이션 플래그
const SHOW_INTRO_ANIMATION = true;

export default function RedirectComponent() {
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [showText, setShowText] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const hostname = window.location.hostname;
            if (hostname.includes('github.io') || (hostname === 'localhost' && SHOW_INTRO_ANIMATION)) {
                setShouldRedirect(true);

                const canvas = canvasRef.current;
                if (!canvas) return;
                const ctx = canvas.getContext('2d');
                if (!ctx) return;

                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;

                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                const text = "Sooyoung♥Jungho";

                const initialLetters = text.split('').map((char, index) => ({
                    char,
                    x: centerX + (Math.random() - 0.5) * canvas.width,
                    y: centerY + (Math.random() - 0.5) * canvas.height,
                    targetX: centerX - (text.length * 20 / 2) + (index * 20),
                    targetY: centerY,
                    speed: 0.05
                }));

                const animate = () => {
                    if (!ctx) return;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                    ctx.font = "bold 3rem MadeKenfolg";
                    ctx.fillStyle = '#ffffff';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';

                    initialLetters.forEach(letter => {
                        letter.x += (letter.targetX - letter.x) * letter.speed;
                        letter.y += (letter.targetY - letter.y) * letter.speed;
                        ctx.fillText(letter.char, letter.x, letter.y);
                    });

                    animationRef.current = requestAnimationFrame(animate);
                };

                animate();

                setTimeout(() => {
                    if (hostname.includes('github.io')) {
                        window.location.replace('https://sooyoung-jungho-wedding.netlify.app' + window.location.pathname);
                    } else {
                        setShowText(true);
                        setTimeout(() => {
                            setShouldRedirect(false);
                        }, 500); // 페이드 아웃을 위한 지연
                    }
                }, 2000);

                return () => {
                    if (animationRef.current) {
                        cancelAnimationFrame(animationRef.current);
                    }
                };
            }
        }
    }, []);

    if (shouldRedirect) {
        return (
            <div
                style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'linear-gradient(-45deg, #0a2815, #1a4031, #204c3d, #2d5c46)',
                    backgroundSize: '400% 400%',
                    zIndex: 9999,
                    animation: 'gradient 3s ease infinite',
                    opacity: showText ? 0 : 1,
                    transition: 'opacity 0.5s ease-out'
                }}
            >
                <canvas
                    ref={canvasRef}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none'
                    }}
                />
            </div>
        );
    }

    return null;
} 