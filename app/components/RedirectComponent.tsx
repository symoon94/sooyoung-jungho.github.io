'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export default function RedirectComponent() {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const hostname = window.location.hostname;
            if (hostname.includes('github.io')) {
                // 즉시 리다이렉트 스크립트를 삽입
                const redirectScript = document.createElement('script');
                redirectScript.innerHTML = `
                    window.stop();
                    window.location.replace('https://sooyoung-jungho-wedding.netlify.app' + window.location.pathname);
                `;
                document.head.appendChild(redirectScript);
            }
        }
    }, []);

    // github.io 도메인일 때 보여줄 임시 로딩 상태
    if (typeof window !== 'undefined' && window.location.hostname.includes('github.io')) {
        return (
            <div style={{ 
                position: 'fixed', 
                inset: 0, 
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center' 
            }}>
            </div>
        );
    }

    return null;
} 