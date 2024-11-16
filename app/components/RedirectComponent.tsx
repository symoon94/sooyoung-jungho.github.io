'use client';

import { useEffect, useState } from 'react';

export default function RedirectComponent() {
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [showText, setShowText] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const hostname = window.location.hostname;
            if (hostname.includes('github.io    ')) {
                setShouldRedirect(true);
                setTimeout(() => setShowText(true), 100);

                setTimeout(() => setFadeOut(true), 1500);

                setTimeout(() => {
                    window.location.replace('https://sooyoung-jungho-wedding.netlify.app' + window.location.pathname);
                }, 2000);
            }
        }
    }, []);

    if (shouldRedirect) {
        return (
            <>
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'linear-gradient(-45deg, #1a472a, #2d6a4f, #40916c, #52b788)',
                        backgroundSize: '400% 400%',
                        zIndex: 9999,
                        animation: 'gradient 3s ease infinite',
                    }}
                >
                    <style jsx>{`
                        @keyframes gradient {
                            0% {
                                background-position: 0% 50%;
                            }
                            50% {
                                background-position: 100% 50%;
                            }
                            100% {
                                background-position: 0% 50%;
                            }
                        }
                        @keyframes fadeIn {
                            from {
                                opacity: 0;
                                transform: translateY(20px);
                            }
                            to {
                                opacity: 1;
                                transform: translateY(0);
                            }
                        }
                        @keyframes wave {
                            0% { transform: translateY(0) rotate(0deg); }
                            25% { transform: translateY(-15px) rotate(2deg); }
                            50% { transform: translateY(0) rotate(0deg); }
                            75% { transform: translateY(-15px) rotate(-2deg); }
                            100% { transform: translateY(0) rotate(0deg); }
                        }
                        @keyframes starFall {
                            0% {
                                transform: translateY(-10vh) translateX(0);
                                opacity: 1;
                            }
                            100% {
                                transform: translateY(110vh) translateX(20px);
                                opacity: 0;
                            }
                        }
                        .star {
                            position: absolute;
                            width: 2px;
                            height: 2px;
                            background: white;
                            border-radius: 50%;
                            animation: starFall linear infinite;
                        }
                        .star::after {
                            content: '';
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            background: white;
                            border-radius: 50%;
                            filter: blur(1px);
                        }
                        @keyframes fadeToWhite {
                            0% {
                                opacity: 0;
                            }
                            100% {
                                opacity: 1;
                            }
                        }
                    `}</style>
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'rgba(255, 255, 255, 0.1)',
                            maskImage: 'linear-gradient(to bottom, transparent, black 50%, transparent)',
                            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 50%, transparent)',
                            animation: 'wave 8s ease-in-out infinite',
                            transform: 'translateY(0)',
                            pointerEvents: 'none'
                        }}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'rgba(255, 255, 255, 0.05)',
                            maskImage: 'linear-gradient(to bottom, transparent, black 50%, transparent)',
                            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 50%, transparent)',
                            animation: 'wave 10s ease-in-out infinite',
                            transform: 'translateY(0)',
                            pointerEvents: 'none'
                        }}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '0',
                            right: '0',
                            transform: 'translateY(-50%)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            color: 'white',
                            opacity: showText ? 1 : 0,
                            animation: showText ? 'fadeIn 1s ease-out' : 'none',
                            fontFamily: 'MadeKenfolg, serif',
                            fontSize: '2rem',
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem'
                        }}>
                            <span>Sooyoung</span>
                            <span>♥</span>
                            <span>Jungho</span>
                        </div>
                    </div>
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="star"
                            style={{
                                left: `${Math.random() * 100}%`,
                                animationDuration: `${Math.random() * 2 + 2}s`,
                                animationDelay: `${Math.random() * 3}s`,
                                opacity: Math.random() * 0.8 + 0.2
                            }}
                        />
                    ))}
                </div>
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'black',
                        opacity: fadeOut ? 1 : 0,
                        transition: 'opacity 0.5s ease-in',
                        zIndex: 10000,
                    }}
                />
            </>
        );
    }

    return null;
} 