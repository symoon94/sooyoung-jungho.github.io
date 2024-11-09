'use client';

import { useEffect } from 'react';
import Image from 'next/image';

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function KakaoShare() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.min.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.Kakao) {
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
        }
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const sendKakaoLink = () => {
    if (window.Kakao) {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: '정호 ♥ 수영의 결혼식에 초대합니다',
          description: '2025년 2월 16일 일요일 오후 2시\n노블발렌티 대치',
          imageUrl: 'https://github.com/sooyoung-jungho/sooyoung-jungho.github.io/blob/main/public/gallery/couple.jpg?raw=true',
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        buttons: [
          {
            title: '청첩장 보기',
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
      });
    }
  };

  return (
    <button 
      onClick={sendKakaoLink}
      className="fixed bottom-24 right-4 z-50 bg-yellow-300 p-2 rounded-full shadow-lg hover:bg-yellow-400 transition-colors"
    >
      <Image 
        src="/kakao-share.png" 
        alt="카카오톡 공유하기" 
        width={32} 
        height={32}
      />
    </button>
  );
} 