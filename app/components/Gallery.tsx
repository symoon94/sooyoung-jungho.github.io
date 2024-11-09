'use client';
import { useState } from 'react';
import Image from 'next/image';

interface Photo {
    id: number;
    src: string;
    alt: string;
}

export default function Gallery() {
    const photos: Photo[] = [
        { id: 1, src: '/gallery/photo1.jpg', alt: '우리의 순간 1' },
        { id: 2, src: '/gallery/photo2.jpg', alt: '우리의 순간 2' },
        { id: 3, src: '/gallery/photo3.jpg', alt: '우리의 순간 3' },
    ];

    const [currentPhoto, setCurrentPhoto] = useState(0);

    return (
        <div className="w-full max-w-md mx-auto">
            {/* Gallery 타이틀 */}
            <div className="text-center mb-8">
                <div className="inline-block border border-green-800 px-8 py-2 text-green-800 italic" style={{ borderRadius: '50%', fontFamily: 'MadeKenfolg' }}>
                    gallery
                </div>
            </div>

            {/* 메인 이미지 */}
            <div className="mb-4 relative w-full h-[500px]">
                <Image
                    src={photos[currentPhoto].src}
                    alt={photos[currentPhoto].alt}
                    fill
                    className="object-cover rounded-lg"
                    style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
                    draggable="false"
                    sizes="(max-width: 768px) 100vw, 768px"
                />
            </div>

            {/* 썸네일 슬라이더 */}
            <div className="flex justify-center items-center gap-2 relative">
                <button
                    className="absolute left-0 text-gray-400 text-4xl hover:text-gray-600 transition-colors"
                    onClick={() => setCurrentPhoto(prev => (prev > 0 ? prev - 1 : photos.length - 1))}
                >
                    ‹
                </button>
                {photos.map((photo, index) => (
                    <div key={photo.id} className="w-16 h-16 bg-gray-200 rounded-lg cursor-pointer relative" onClick={() => setCurrentPhoto(index)}>
                        <Image
                            src={photo.src}
                            alt={photo.alt}
                            fill
                            className="object-cover rounded-lg"
                            style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
                            draggable="false"
                            sizes="64px"
                        />
                    </div>
                ))}
                <button
                    className="absolute right-0 text-gray-400 text-4xl hover:text-gray-600 transition-colors"
                    onClick={() => setCurrentPhoto(prev => (prev < photos.length - 1 ? prev + 1 : 0))}
                >
                    ›
                </button>
            </div>
        </div>
    );
} 