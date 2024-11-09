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
            const nobleValenti = new window.naver.maps.LatLng(37.508811, 127.056127); // 노블발렌티 대치 좌표

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
        <div className="w-full aspect-square rounded-xl overflow-hidden">
            <div id="map" className="w-full h-full" />
        </div>
    );
} 