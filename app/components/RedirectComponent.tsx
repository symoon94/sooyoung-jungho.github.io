'use client';

import { useEffect, useState } from 'react';

export default function RedirectComponent() {
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [showText, setShowText] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const hostname = window.location.hostname;
            if (hostname.includes('github.io')) {
                setShouldRedirect(true);
                // 텍스트 표시 애니메이션
                setTimeout(() => setShowText(true), 100);
                // 리다이렉트
                setTimeout(() => {
                    window.location.replace('https://sooyoung-jungho-wedding.netlify.app' + window.location.pathname);
                }, 1000);
            }
        }
    }, []);

    if (shouldRedirect) {
        return (
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
                `}</style>
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                        color: 'white',
                        opacity: showText ? 1 : 0,
                        animation: showText ? 'fadeIn 1s ease-out' : 'none',
                        fontFamily: 'MadeKenfolg, serif',
                        fontSize: '1.5rem'
                    }}
                >
                    <span>Sooyoung</span>
                    <span style={{ margin: '0 0.5rem' }}>♥</span>
                    <span>Jungho</span>
                </div>
            </div>
        );
    }

    return null;
} 