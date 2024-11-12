'use client';

import { useEffect } from 'react';

export default function RedirectComponent() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hostname === 'sooyoung-jungho.github.io') {
      window.location.href = 'https://sooyoung-jungho.netlify.app' + window.location.pathname;
    }
  }, []);

  return null;
} 