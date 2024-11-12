'use client';

import { useEffect } from 'react';

declare global {
    interface Window {
        naver: any;
    }
}

export default function Map() {
    useEffect(() => {
        const initMap = () => {
            const nobleValenti = new window.naver.maps.LatLng(37.503518, 127.065358); // 노블발렌티 대치 좌표

            const mapOptions = {
                center: nobleValenti,
                zoom: 17,
                minZoom: 8,
                zoomControl: true,
                zoomControlOptions: {
                    position: window.naver.maps.Position.TOP_RIGHT
                }
            };

            const map = new window.naver.maps.Map('map', mapOptions);

            const contentString = [
                '<div class="iw_inner" style="padding:8px; margin: 0; width: 150px; text-align: center; display: flex; flex-direction: column; justify-content: center;">',
                '   <p style="font-size: 1rem; margin: 0 0 4px 0; font-weight: 500;">노블발렌티 대치</p>',
                '   <p style="font-size: 0.7rem; margin: 0;">서울 강남구 영동대로 325</p>',
                '</div>'
            ].join('');

            const markerIcon = {
                content: `<div style="width: 30px; height: 30px; display: flex; justify-content: center; align-items: center;">
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="#E11D48">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                         </div>`,
                size: new window.naver.maps.Size(30, 30),
                anchor: new window.naver.maps.Point(15, 15)
            };

            const marker = new window.naver.maps.Marker({
                position: nobleValenti,
                map: map,
                icon: markerIcon
            });

            const infowindow = new window.naver.maps.InfoWindow({
                content: contentString,
                maxWidth: 200,
                backgroundColor: "white",
                borderColor: "#ddd",
                borderWidth: 1,
                borderRadius: 8,
                disableAnchor: true,
                textAlign: "center",
                pixelOffset: new window.naver.maps.Point(0, -5)
            });

            window.naver.maps.Event.addListener(marker, "click", function () {
                if (infowindow.getMap()) {
                    infowindow.close();
                } else {
                    infowindow.open(map, marker);
                }
            });

            infowindow.open(map, marker);
        };

        // 스크립트 로드
        const script = document.createElement('script');
        script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`;
        script.onload = initMap;
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    return (
        <div className="space-y-4">
            <div className="w-full aspect-square rounded-xl overflow-hidden">
                <div id="map" className="w-full h-full" />
            </div>

            {/* Navigation Section */}
            <div className="text-center space-y-4">
                <div className="flex justify-center gap-12">
                    <a
                        href="https://naver.me/5Rct8LyC"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                    >
                        <div className="w-5 h-5 bg-[#666666] rounded flex items-center justify-center">
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="white">
                                <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" />
                            </svg>
                        </div>
                        <span className="text-sm text-[#666666]">네이버지도</span>
                    </a>
                    <a
                        href="https://tmap.life/9ac9c57c"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                    >
                        <div className="w-5 h-5 bg-[#666666] rounded flex items-center justify-center">
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="white">
                                <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" />
                            </svg>
                        </div>
                        <span className="text-sm text-[#666666]">티맵</span>
                    </a>
                </div>
            </div>
        </div>
    );
} 