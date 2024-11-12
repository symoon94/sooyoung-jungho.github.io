'use client';

import { useEffect } from 'react';

export default function RedirectComponent() {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const hostname = window.location.hostname;
            if (hostname === 'sooyoung-jungho.github.io') {
                // 즉시 리다이렉션을 위해 document.write 사용
                document.write(`
          <html>
            <head>
              <meta http-equiv="refresh" content="0; url=https://sooyoung-jungho.netlify.app${window.location.pathname}">
            </head>
            <body>
              <p></p>
            </body>
          </html>
        `);
            }
        }
    }, []);

    return null;
} 