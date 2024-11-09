'use client';

import { useState } from 'react';

interface Photo {
    id: number;
    src: string;
    alt: string;
}

export default function Gallery() {
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

    const photos: Photo[] = [
        { id: 1, src: '/gallery/photo1.jpg', alt: '우리의 순간 1' },
        { id: 2, src: '/gallery/photo2.jpg', alt: '우리의 순간 2' },
        { id: 3, src: '/gallery/photo3.jpg', alt: '우리의 순간 3' },
        { id: 4, src: '/gallery/photo4.jpg', alt: '우리의 순간 4' },
        { id: 5, src: '/gallery/photo5.jpg', alt: '우리의 순간 5' },
        { id: 6, src: '/gallery/photo6.jpg', alt: '우리의 순간 6' },
    ];

    const handlePrevious = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!selectedPhoto) return;
        const currentIndex = photos.findIndex(photo => photo.id === selectedPhoto.id);
        const previousIndex = (currentIndex - 1 + photos.length) % photos.length;
        setSelectedPhoto(photos[previousIndex]);
    };

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!selectedPhoto) return;
        const currentIndex = photos.findIndex(photo => photo.id === selectedPhoto.id);
        const nextIndex = (currentIndex + 1) % photos.length;
        setSelectedPhoto(photos[nextIndex]);
    };

    return (
        <div className="w-full max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {photos.map((photo) => (
                    <div
                        key={photo.id}
                        className="relative aspect-square overflow-hidden rounded-lg cursor-pointer transform transition-transform hover:scale-105"
                        onClick={() => setSelectedPhoto(photo)}
                    >
                        <img
                            src={photo.src}
                            alt={photo.alt}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>

            {/* Modal for selected photo */}
            {selectedPhoto && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedPhoto(null)}
                >
                    <button
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl p-4 hover:bg-white/10 rounded-full transition-colors"
                        onClick={handlePrevious}
                    >
                        ‹
                    </button>
                    <div className="relative max-w-4xl max-h-[90vh]">
                        <img
                            src={selectedPhoto.src}
                            alt={selectedPhoto.alt}
                            className="max-w-full max-h-[90vh] object-contain"
                        />
                        <button
                            className="absolute top-4 right-4 text-white text-4xl"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedPhoto(null);
                            }}
                        >
                            ×
                        </button>
                    </div>
                    <button
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl p-4 hover:bg-white/10 rounded-full transition-colors"
                        onClick={handleNext}
                    >
                        ›
                    </button>
                </div>
            )}
        </div>
    );
} 