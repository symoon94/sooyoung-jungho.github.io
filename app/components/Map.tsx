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

            const marker = new window.naver.maps.Marker({
                position: nobleValenti,
                map: map
            });

            const contentString = [
                '<div class="iw_inner" style="padding:5px; margin: 5px 0px 5px 0px; width: 150px; height: 45px; text-align: center;">',
                '   <p style="font-size: 1rem; margin: 0; font-weight: 500;">노블발렌티 대치</p>',
                '   <p style="font-size: 0.8rem; margin: 0;">서울 강남구 영동대로 325</p>',
                '</div>'
            ].join('');

            const infowindow = new window.naver.maps.InfoWindow({
                content: contentString,
                maxWidth: 200,
                height: 50,
                backgroundColor: "white",
                borderColor: "#ddd",
                borderWidth: 1,
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
            <div className="flex justify-center gap-8">
                <a
                    href="https://naver.me/5Rct8LyC"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2"
                >
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#666666">
                        <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"/>
                    </svg>
                    <span className="text-sm text-[#666666]">네이버지도</span>
                </a>
                <a
                    href="https://tmap.life/9ac9c57c"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2"
                >
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#666666">
                        <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"/>
                    </svg>
                    <span className="text-sm text-[#666666]">티맵</span>
                </a>
            </div>
        </div>
    );
} 