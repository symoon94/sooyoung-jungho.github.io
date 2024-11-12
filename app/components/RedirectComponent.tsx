'use client';

import { useEffect } from 'react';

export default function RedirectComponent() {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const hostname = window.location.hostname;
            if (hostname.includes('github.io')) {
                // 모든 리소스 로딩을 중단하고 즉시 리다이렉트
                // window.stop();
                // window.location.replace('https://sooyoung-jungho.netlify.app' + window.location.pathname);
            }
        }
    }, []);

    return null;
} 